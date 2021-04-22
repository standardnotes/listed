import PropTypes from "prop-types";
import React, { useState } from "react";
import SVG from "react-inlinesvg";
import axios from "axios";
import getAuthToken from "../../../utils/getAuthToken";
import CredentialForm from "./CredentialForm";
import ConfirmationModal from "./ConfirmationModal";
import Dropdown from "../../shared/Dropdown";
import {
    IcEdit, IcWalletFilled, IcMoreHorizontal, IcTrash,
} from "../../../assets/icons";
import "./PaymentDetails.scss";

const PaymentDetails = ({
    author,
    authorCredentialsUrl,
    setErrorToastMessage,
    setIsErrorToastDisplayed,
}) => {
    const [editCredentialFormDisplayed, setEditCredentialFormDisplayed] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [confirmationModalDisplayed, setConfirmationModalDisplayed] = useState(null);

    const deleteCredential = async (credential) => {
        setIsErrorToastDisplayed(false);
        setConfirmationModalDisplayed(null);

        try {
            const response = await axios
                .delete(`/authors/${author.id}/credentials/${credential.id}?secret=${author.secret}`, {
                    headers: {
                        "X-CSRF-Token": getAuthToken(),
                    },
                });

            Turbolinks.visit(response.request.responseURL);
        } catch (err) {
            setErrorToastMessage("There was an error trying to delete the payment detail. Please try again.");
            setIsErrorToastDisplayed(true);
        }
    };

    const dropdownOptions = (credential) => {
        const options = [
            {
                icon: IcTrash,
                text: "Delete",
                action: () => setConfirmationModalDisplayed(credential.id),
            },
        ];

        if (editCredentialFormDisplayed !== credential.id) {
            options.unshift({
                icon: IcEdit,
                text: "Edit",
                action: () => setEditCredentialFormDisplayed(credential.id),
            });
        }

        return options;
    };

    return (
        <div className="payment-details">
            <p className="p2 payment-details__info">
                Listed allows authors to receive tips and donations in a platform-agnostic way.
                Readers can pay authors by clicking the
                &apos;Thank&apos; option on the author profile.
                This will display the various ways you have indicated you can receive payments.
            </p>
            <p className="p2 payment-details__info">
                Once a reader sends you a tip or donation,
                they are advised, but not required to, fill out your
                guestbook to notify you that they have made a payment.
            </p>
            <p className="p2 payment-details__info">
                Below, you can add any custom payment &quot;credential&quot;.
                For example, you can specify a key of &quot;Bitcoin&quot;, and
                the value will be your BTC address.
                Or, you can specify a key of &quot;PayPal&quot;, and the value will be your
                PayPal payment link.
            </p>
            <CredentialForm
                authorCredentialUrl={authorCredentialsUrl}
                setIsErrorToastDisplayed={setIsErrorToastDisplayed}
                setErrorToastMessage={setErrorToastMessage}
            />
            <div>
                {author.credentials.map((credential) => (
                    <div
                        key={credential.id}
                        className="callout callout--info"
                    >
                        <div className="payment-details__credential hover-container">
                            <div className="credential__details">
                                <SVG className="credential__icon" src={IcWalletFilled} />
                                <span className="credential__key">
                                    Key:
                                    {" "}
                                    <strong>{credential.key}</strong>
                                </span>
                                <span>
                                    Value:
                                    {" "}
                                    <strong>{credential.value}</strong>
                                </span>
                            </div>
                            <div className="hover-content">
                                <Dropdown
                                    options={dropdownOptions(credential)}
                                    isOpen={!!dropdownOpen && dropdownOpen === credential.id}
                                    onClick={() => setDropdownOpen(credential.id)}
                                >
                                    <div className="hover-content__icon-container">
                                        <SVG src={IcMoreHorizontal} className="hover-content__icon" />
                                    </div>
                                </Dropdown>
                            </div>
                        </div>
                        {editCredentialFormDisplayed
                        && editCredentialFormDisplayed === credential.id
                        && (
                            <CredentialForm
                                currentCredential={credential}
                                authorCredentialUrl={`/authors/${author.id}/credentials/${credential.id}?secret=${author.secret}`}
                                setIsErrorToastDisplayed={setIsErrorToastDisplayed}
                                setErrorToastMessage={setErrorToastMessage}
                            />
                        )}
                        {confirmationModalDisplayed
                        && confirmationModalDisplayed === credential.id
                        && (
                            <ConfirmationModal
                                text={`Are you sure you want to delete payment details for ${credential.key}?`}
                                primaryOption={{
                                    text: "Delete",
                                    onClick: () => deleteCredential(credential),
                                }}
                                secondaryOption={{
                                    text: "Cancel",
                                    onClick: () => setConfirmationModalDisplayed(null),
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

PaymentDetails.propTypes = {
    author: PropTypes.shape({
        credentials: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                key: PropTypes.string.isRequired,
                value: PropTypes.string.isRequired,
            }),
        ).isRequired,
        id: PropTypes.number.isRequired,
        secret: PropTypes.string.isRequired,
    }).isRequired,
    authorCredentialsUrl: PropTypes.string.isRequired,
    setErrorToastMessage: PropTypes.func.isRequired,
    setIsErrorToastDisplayed: PropTypes.func.isRequired,
};

export default PaymentDetails;
