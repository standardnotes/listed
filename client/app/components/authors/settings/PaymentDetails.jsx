import React, { useState } from "react";
import SVG from "react-inlinesvg";
import axios from "axios";
import getAuthToken from "../../../utils/getAuthToken";
import CredentialForm from "./CredentialForm";
import Dropdown from "../../shared/Dropdown";
import { IcEdit, IcWalletFilled, IcMoreHorizontal, IcTrash } from "../../../assets/icons";
import "./PaymentDetails.scss";

const PaymentDetails = ({ author, authorCredentialsUrl }) => {
    const [editCredentialFormDisplayed, setEditCredentialFormDisplayed] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(null); 

    const deleteCredential = credential => {
        axios
            .delete(`/authors/${author.id}/credentials/${credential.id}?secret=${author.secret}`, {
                headers: {
                    "X-CSRF-Token": getAuthToken()
                }
            })
            .then(response => {
                Turbolinks.visit(response.request.responseURL);
            })
    }

    const dropdownOptions = credential => {
        const options = [
            {
                icon: IcTrash,
                text: "Delete",
                action: () => deleteCredential(credential)
            }
        ];

        if (editCredentialFormDisplayed !== credential.id) {
            options.unshift({
                icon: IcEdit,
                text: "Edit",
                action: () => setEditCredentialFormDisplayed(credential.id)
            });
        }

        return options;
    }

    return (
        <div className="payment-details">
            <p className="p2 payment-details__info">
                Listed allows authors to receive tips and donations in a platform-agnostic way. Readers can pay authors
                by clicking the 'Thank' option on the author profile. This will display the various ways you have
                indicated you can receive payments.
            </p>
            <p className="p2 payment-details__info">
                Once a reader sends you a tip or donation, they are advised, but not required to, fill out your
                guestbook to notify you that they have made a payment.
            </p>
            <p className="p2 payment-details__info">
                Below, you can add any custom payment "credential". For example, you can specify a key of "Bitcoin", and
                the value will be your BTC address. Or, you can specify a key of "PayPal", and the value will be your
                PayPal payment link.
            </p>
            <CredentialForm authorCredentialUrl={authorCredentialsUrl} />
            <div>
                {author.credentials.map(credential => (
                        <div
                            key={credential.id}
                            className="callout callout--success"
                        >
                            <div className="payment-details__credential">
                                <div className="credential__details">
                                    <SVG className="credential__icon" src={IcWalletFilled} />
                                    <span className="credential__key">
                                        Key:{" "}<strong>{credential.key}</strong>
                                    </span>
                                    <span>
                                        Value:{" "}<strong>{credential.value}</strong>
                                    </span>
                                </div>
                                <div className="credential__hover-container">
                                    <Dropdown
                                        options={dropdownOptions(credential)}
                                        isOpen={dropdownOpen && dropdownOpen === credential.id}
                                        onClick={() => setDropdownOpen(credential.id)}
                                    >
                                        <div className="hover-icon__container">
                                            <SVG src={IcMoreHorizontal} className="hover-icon" />
                                        </div>
                                    </Dropdown>
                                </div>
                            </div>
                            {editCredentialFormDisplayed && editCredentialFormDisplayed === credential.id && (
                                <CredentialForm
                                    currentCredential={credential}
                                    authorCredentialUrl={`/authors/${author.id}/credentials/${credential.id}?secret=${author.secret}`}
                                />
                            )}
                        </div>
                ))}
            </div>
        </div>
    );
};

export default PaymentDetails;
