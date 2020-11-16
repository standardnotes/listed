import React, { useState } from "react";
import axios from "axios";
import SVG from "react-inlinesvg";
import getAuthToken from "../../../utils/getAuthToken";
import { IcLink } from "../../../assets/icons";
import "./CustomDomain.scss";

const CustomDomain = ({ author, customDomainIP }) => {
    const [extendedEmail, setExtendedEmail] = useState("");
    const [domain, setDomain] = useState("");

    const submitDomainRequest = event => {
        event.preventDefault();

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
                window.location.href = response.request.responseURL;
            })
            .catch(error => {
                alert(error.response.data.message);
            })
    };

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
                        <label htmlFor="extended_email" className="label p2">
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
                        <label htmlFor="domain" className="label p2">
                            Your domain
                        </label>
                        <input
                            id="domain"
                            className="text-field"
                            required="required"
                            placeholder="Your domain"
                            value={domain}
                            onChange={e => setDomain(e.target.value)}
                        ></input>
                    </div>
                    <div className="form-section">
                        <button type="submit" className="button button--primary">Submit</button>
                    </div>
                </div>
            </form>
            {author.domain && !author.domain.approved && (
                <div className="callout callout--warning">
                    We've received your domain request and will send you an email when your integration is ready (typically 24-48 hours).
                </div>
            )}
            {author.domain && author.domain.approved && !author.domain.active && (
                <div className="callout callout--warning">
                    Your domain is not currently active. Ensure your Extended subscription is not expired.
                </div>
            )}
            {author.domain && author.domain.active && (
                <div className="callout callout--success">
                    <SVG className="custom-domain__linked-icon" src={IcLink} />
                    <p className="p2">Linked to:{" "}
                        <strong>{author.url}</strong>
                    </p>
                </div>
            )}
        </div>
    );
};

export default props => <CustomDomain {...props} />
