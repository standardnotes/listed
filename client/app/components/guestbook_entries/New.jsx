import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import HCaptcha from '@hcaptcha/react-hcaptcha';
import getAuthToken from "../../utils/getAuthToken";
import "./New.scss";

const New = ({ author, hCaptchaSiteKey }) => {
    const [guestbookEntry, setGuestbookEntry] = useState({
        text: "",
        signer_email: "",
        donation_info: ""
    });
    const [captchaToken, setCaptchaToken] = useState("");
    const [captchaErrorMessage, setCaptchaErrorMessage] = useState("");
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const captcha = useRef(null);

    const submitEntry = event => {
        event.preventDefault();

        axios
            .post(`/authors/${author.id}/guestbook`, null, {
                headers: {
                    "X-CSRF-Token": getAuthToken()
                },
                data: {
                    guestbook_entry: guestbookEntry,
                    token: captchaToken,
                }
            })
            .then(response => {
                if (response.data.error) {
                    captcha.current.resetCaptcha();
                    setCaptchaErrorMessage(response.data.error);
                } else {
                    setCaptchaErrorMessage("");
                    setCaptchaToken("");
                    window.location.href = response.request.responseURL;
                }
            });
    };

    const editGuestbookEntry = (key, value) => (
        setGuestbookEntry(prevState => (
            { ...prevState, [key]: value }
        ))
    );

    useEffect(() => {
        setIsSubmitDisabled(!guestbookEntry.text || !captchaToken);
    }, [guestbookEntry.text, captchaToken]);

    return(
        <div className="card guestbook-entry-form__container">
            <h3 className="h3">
                New entry
            </h3>
            <div className="guestbook-entry-form">
                <form onSubmit={e => submitEntry(e)}>
                    <div className="form-section">
                        <label htmlFor="guestbook-entry-text" className="label p2 label--required">
                            Your message
                        </label>
                        <p className="p3">
                            This will be visible to everyone.
                        </p>
                        <textarea
                            id="guestbook-entry-text"
                            className="text-field"
                            value={guestbookEntry.text}
                            onChange={e => editGuestbookEntry("text", e.target.value)}
                            rows="4"
                            required="required"
                        ></textarea>
                    </div>
                    <div className="form-section mt-10">
                        <label htmlFor="guestbook-entry-signer-email" className="label p2">
                            Your email (optional)
                        </label>
                        <input
                            id="guestbook-entry-signer-email"
                            className="text-field"
                            value={guestbookEntry.signer_email}
                            onChange={e => editGuestbookEntry("signer_email", e.target.value)}
                        ></input>
                    </div>
                    <div className="form-section mt-10">
                        <label htmlFor="guestbook-entry-donation-info" className="label p2">
                            Donation info (optional)
                        </label>
                        <p className="p3 sublabel">
                            If you've made a contribution, feel free to let the author know the method you've used, and the amount.
                        </p>
                        <input
                            id="guestbook-entry-donation-info"
                            className="text-field"
                            value={guestbookEntry.donation_info}
                            onChange={e => editGuestbookEntry("donation_info", e.target.value)}
                        ></input>
                    </div>
                    <div className="form-section">
                        <HCaptcha
                            ref={captcha}
                            sitekey={hCaptchaSiteKey}
                            onVerify={token => setCaptchaToken(token)}
                        />
                        {captchaErrorMessage && (
                            <div className="error-message">
                                {captchaErrorMessage}
                            </div>
                        )}
                    </div>
                    <div className="guestbook-entry-form__button-container">
                        <button
                            type="submit"
                            className={`button ${isSubmitDisabled ? "button--disabled" : "button--primary"}`}
                            disabled={isSubmitDisabled}
                        >
                            Send
                        </button>
                        <p className="p3">
                            You’ll not be able to edit your message after submission.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default props => <New {...props} />;
