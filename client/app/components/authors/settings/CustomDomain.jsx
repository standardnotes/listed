import React, { useState } from "react";
import axios from "axios";

const CustomDomain = ({ author, authenticityToken, customDomainIP }) => {
    const [extendedEmail, setExtendedEmail] = useState("");
    const [domain, setDomain] = useState("");

    const submitDomainRequest = event => {
        event.preventDefault();

        axios
            .post(`/authors/${author.id}/domain_request?secret=${author.secret}`, null, {
                headers: {
                    "X-CSRF-Token": authenticityToken,
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
        <div className="mt-30 form-box full">
            <strong>Custom Domain</strong>
            <p>
                Custom domains are available for Standard Notes{" "}
                <a href="https://standardnotes.org/extended" target="blank" rel="noopener noreferrer">Extended</a>
                {" "}members with an active one year or five year plan.
                Domains include an HTTPS certificate, and require only a simple DNS record on your end.
            </p>
            <p>
                Before submitting this form, please create an "A" record with your DNS provider with
                value {customDomainIP}.
            </p>
            {author.domain ? (
                !author.domain.approved ? (
                    <strong>
                        We've received your domain request and will send you an email when your integration is ready (typically 24-48 hours).
                    </strong>
                ) : (
                    author.domain.active ? (
                        <strong>
                            Your blog is live at{" "}
                            <a href={author.url} target="_blank" rel="noopener noreferrer">{author.url}</a>!
                        </strong>
                    )
                    : (
                    <strong>
                        Your domain is not currently active. Ensure your Extended subscription is not expired.
                    </strong>
                ))
            ) : (
                <form onSubmit={e => submitDomainRequest(e)}>
                    <div className="form-section mt-20">
                        <label htmlFor="extended_email" className="label">
                            Extended email address
                        </label>
                        <div style={ { fontSize: "14px", opacity: 0.5, marginBottom: "5px" }}>
                            The email address used for your Extended account
                        </div>
                        <input
                            id="extended-email"
                            type="email"
                            className="field"
                            required="required"
                            placeholder="Extended email"
                            value={extendedEmail}
                            onChange={e => setExtendedEmail(e.target.value)}
                        ></input>
                    </div>
                    <div className="form-section mt-20">
                        <label htmlFor="domain" className="label">
                            Your domain
                        </label>
                        <div style={ { fontSize: "14px", opacity: 0.5, marginBottom: "5px" }}>
                            The domain you want to use for your Listed blog.
                        </div>
                        <input
                            id="domain"
                            className="field"
                            required="required"
                            placeholder="Your domain"
                            value={domain}
                            onChange={e => setDomain(e.target.value)}
                        ></input>
                    </div>
                    <div className="form-section">
                        <input type="submit" value="Submit"></input>
                    </div>
                </form>
            )}
        </div>
    );
};

export default props => <CustomDomain {...props} />
