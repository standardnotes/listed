import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SVG from "react-inlinesvg";
import getAuthToken from "../../../utils/getAuthToken";
import ConfirmationModal from "./ConfirmationModal";
import Dropdown from "../../shared/Dropdown";
import ErrorToast from "../../shared/ErrorToast";
import { IcLink, IcMoreHorizontal, IcTrash } from "../../../assets/icons";
import "./CustomDomain.scss";

const CustomDomain = ({ author, customDomainIP }) => {
    const [extendedEmail, setExtendedEmail] = useState("");
    const [domain, setDomain] = useState("");
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [domainErrorMessage, setDomainErrorMessage] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [isErrorToastDisplayed, setIsErrorToastDisplayed] = useState(false);
    const [errorToastMessage, setErrorToastMessage] = useState("");

    const dropdownOptions = [
        {
            icon: IcTrash,
            text: "Delete",
            action: () => setShowConfirmationModal(true),
        },
    ];

    const submitDomainRequest = async (event) => {
        event.preventDefault();
        setIsSubmitDisabled(true);
        setIsErrorToastDisplayed(false);
        setShowConfirmationModal(false);

        try {
            const response = await axios
                .post(`/authors/${author.id}/domain_request?secret=${author.secret}`, null, {
                    headers: {
                        "X-CSRF-Token": getAuthToken(),
                    },
                    data: {
                        extended_email: extendedEmail,
                        domain,
                    },
                });

            setDomainErrorMessage(null);
            Turbolinks.visit(response.request.responseURL);
        } catch (err) {
            setIsSubmitDisabled(false);

            if (err.response.status === 409) {
                setDomainErrorMessage(err.response.data.message);
            } else {
                setErrorToastMessage("There was an error trying to submit the domain request. Please try again.");
                setIsErrorToastDisplayed(true);
            }
        }
    };

    const deleteDomain = async () => {
        setIsErrorToastDisplayed(false);
        setShowConfirmationModal(false);

        try {
            const response = await axios
                .post(`/authors/${author.id}/delete_domain?secret=${author.secret}`, null, {
                    headers: {
                        "X-CSRF-Token": getAuthToken(),
                    },
                    data: {
                        domain: author.domain.domain,
                    },
                });

            Turbolinks.visit(response.request.responseURL);
        } catch (err) {
            setErrorToastMessage(
                `There was an error trying to delete the ${author.domain.active ? "domain" : "domain request"}. Please try again.`,
            );
            setIsErrorToastDisplayed(true);
        }
    };

    useEffect(() => {
        setIsSubmitDisabled(!extendedEmail || !domain);
    }, [extendedEmail, domain]);

    return (
        <div className="custom-domain">
            <p className="p2 custom-domain__info">
                Custom domains are available for Standard Notes members with an active Productivity or Professional
                {" "}
                <a href="https://standardnotes.com/plans" target="blank" rel="noopener noreferrer">plan</a>
                .
                Domains include an HTTPS certificate,
                and require only a simple DNS record on your end.
            </p>
            <p className="p2 custom-domain__info">
                Before submitting this form,
                please create an &quot;A&quot; record with your DNS provider with
                value
                {customDomainIP && ` ${customDomainIP}`}
                .
            </p>
            <form onSubmit={(e) => submitDomainRequest(e)}>
                <div className="form-row">
                    <div className="form-section">
                        <label htmlFor="extended_email" className="label label--required p2">
                            Standard Notes account email address
                        </label>
                        <input
                            id="extended-email"
                            type="email"
                            className="text-field"
                            required="required"
                            placeholder="Account email"
                            value={extendedEmail}
                            onChange={(e) => setExtendedEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-section">
                        <label htmlFor="domain" className="label label--required p2">
                            Your domain
                        </label>
                        <input
                            id="domain"
                            className={`text-field ${domainErrorMessage ? "text-field--error" : ""}`}
                            required="required"
                            placeholder="Your domain"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                        />
                    </div>
                    <div className="form-section">
                        <button
                            type="submit"
                            className={`button ${isSubmitDisabled ? "button--disabled" : "button--primary"}`}
                            disabled={isSubmitDisabled}
                        >
                            Submit
                        </button>
                    </div>
                </div>
                <div className="form-row form-row--error">
                    <div className="form-section" />
                    <div className="form-section">
                        {domainErrorMessage && (
                            <div className="error-message">
                                {domainErrorMessage}
                            </div>
                        )}
                    </div>
                    <div className="form-section" />
                </div>
            </form>
            {author.domain && !author.domain.approved && (
                <div className="callout callout--warning">
                    <div className="hover-container">
                        <div className="custom-domain__details">
                            We&apos;ve received your domain request (
                            {author.domain.domain}
                            )
                            {" "}
                            and will send you an email when your integration is ready
                            {" "}
                            (typically up to 1 hour).
                        </div>
                        <div className="hover-content">
                            <Dropdown
                                options={dropdownOptions}
                                isOpen={isDropdownOpen}
                                onClick={() => setIsDropdownOpen()}
                            >
                                <div className="hover-content__icon-container">
                                    <SVG src={IcMoreHorizontal} className="hover-content__icon" />
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            )}
            {author.domain && author.domain.approved && !author.domain.active && (
                <div className="callout callout--warning">
                    Your domain is not currently active.
                    {" "}
                    Ensure your subscription is not expired.
                </div>
            )}
            {author.domain && author.domain.active && (
                <div className="callout callout--success">
                    <div className="hover-container">
                        <div className="custom-domain__details">
                            <SVG className="custom-domain__linked-icon" src={IcLink} />
                            <p className="p2">
                                Linked to:
                                {" "}
                                <strong>{author.url}</strong>
                            </p>
                        </div>
                        <div className="hover-content">
                            <Dropdown
                                options={dropdownOptions}
                                isOpen={isDropdownOpen}
                                onClick={() => setIsDropdownOpen()}
                            >
                                <div className="hover-content__icon-container">
                                    <SVG src={IcMoreHorizontal} className="hover-content__icon" />
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            )}
            {showConfirmationModal && (
                <ConfirmationModal
                    text={author.domain.active
                        ? `Are you sure you want to delete custom domain ${author.domain.domain}?`
                        : `Are you sure you want to delete the request for custom domain ${author.domain.domain}?`}
                    primaryOption={{
                        text: "Delete",
                        onClick: () => deleteDomain(author.domain.domain),
                    }}
                    secondaryOption={{
                        text: "Cancel",
                        onClick: () => setShowConfirmationModal(false),
                    }}
                />
            )}
            <ErrorToast
                message={errorToastMessage}
                isDisplayed={isErrorToastDisplayed}
                setIsDisplayed={setIsErrorToastDisplayed}
            />
        </div>
    );
};

CustomDomain.propTypes = {
    author: PropTypes.shape({
        domain: PropTypes.shape({
            active: PropTypes.bool.isRequired,
            approved: PropTypes.bool.isRequired,
            domain: PropTypes.string.isRequired,
        }),
        id: PropTypes.number.isRequired,
        secret: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    }).isRequired,
    customDomainIP: PropTypes.string.isRequired,
};

export default (props) => <CustomDomain {...props} />;
