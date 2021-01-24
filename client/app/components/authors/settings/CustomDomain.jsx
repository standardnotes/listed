import React, { useState, useEffect } from "react";
import axios from "axios";
import SVG from "react-inlinesvg";
import getAuthToken from "../../../utils/getAuthToken";
import ConfirmationModal from "./ConfirmationModal";
import Dropdown from "../../shared/Dropdown";
import { IcLink, IcMoreHorizontal, IcTrash } from "../../../assets/icons";
import "./CustomDomain.scss";

const CustomDomain = ({ author, customDomainIP }) => {
    const [extendedEmail, setExtendedEmail] = useState("");
    const [domain, setDomain] = useState("");
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [domainErrorMessage, setDomainErrorMessage] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const dropdownOptions = [
        {
            icon: IcTrash,
            text: "Delete",
            action: () => setShowConfirmationModal(true)
        }
    ];

    const submitDomainRequest = event => {
        event.preventDefault();
        setIsSubmitDisabled(true);

        axios
            .post(`/authors/${author.id}/domain_request?secret=${author.secret}`, null, {
                headers: {
                    "X-CSRF-Token": getAuthToken()
                },
                data: {
                    extended_email: extendedEmail,
                    domain: domain
                }
            })
            .then(response => {
                setDomainErrorMessage(null);
                Turbolinks.visit(response.request.responseURL);
            })
            .catch(error => {
                setDomainErrorMessage(error.response.data.message);
                setIsSubmitDisabled(false);
            })
    };

    const deleteDomain = domain => {
        axios
            .post(`/authors/${author.id}/delete_domain?secret=${author.secret}`, null, {
                headers: {
                    "X-CSRF-Token": getAuthToken()
                },
                data: {
                    domain: domain
                }
            })
            .then(response => {
                Turbolinks.visit(response.request.responseURL);
            })
    };


    useEffect(() => {
        setIsSubmitDisabled(!extendedEmail || !domain);
    }, [extendedEmail, domain]);

    return (
        <div className="custom-domain">
            <p className="p2 custom-domain__info">
                Custom domains are available for Standard Notes{" "}
                <a href="https://standardnotes.org/extended" target="blank" rel="noopener noreferrer">Extended</a>
                {" "}members with an active one year or five year plan.
                Domains include an HTTPS certificate, and require only a simple DNS record on your end.
            </p>
            <p className="p2 custom-domain__info">
                Before submitting this form, please create an "A" record with your DNS provider with
                value {customDomainIP}.
            </p>
            <form onSubmit={e => submitDomainRequest(e)}>
                <div className="form-row">
                    <div className="form-section">
                        <label htmlFor="extended_email" className="label label--required p2">
                            Extended email address
                        </label>
                        <input
                            id="extended-email"
                            type="email"
                            className="text-field"
                            required="required"
                            placeholder="Extended email"
                            value={extendedEmail}
                            onChange={e => setExtendedEmail(e.target.value)}
                        ></input>
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
                            onChange={e => setDomain(e.target.value)}
                        ></input>
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
                    <div className="form-section"></div>
                    <div className="form-section">
                        {domainErrorMessage && (
                            <div className="error-message">
                                {domainErrorMessage}
                            </div>
                        )}
                    </div>
                    <div className="form-section"></div>
                </div>
            </form>
            {author.domain && !author.domain.approved && (
                <div className="callout callout--warning">
                    <div className="hover-container">
                        <div className="custom-domain__details">
                            We've received your domain request ({author.domain.domain}){" "}
                            and will send you an email when your integration is ready (typically up to 1 hour).
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
                    Your domain is not currently active. Ensure your Extended subscription is not expired.
                </div>
            )}
            {author.domain && author.domain.active && (
                <div className="callout callout--success">
                    <div className="hover-container">
                        <div className="custom-domain__details">
                            <SVG className="custom-domain__linked-icon" src={IcLink} />
                            <p className="p2">Linked to:{" "}
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
                        text: "Cancel",
                        onClick: () => setShowConfirmationModal(false),
                    }}
                    secondaryOption={{
                        text: "Delete",
                        onClick: () => deleteDomain(author.domain.domain),
                    }}
                />
            )}
        </div>
    );
};

export default props => <CustomDomain {...props} />
