import React, { useState } from "react";
import axios from "axios";
import getAuthToken from "../../utils/getAuthToken";
import "./New.scss";

const New = ({ author, simpleCaptchaKey, simpleCaptchaImageUrl }) => {
    const [captchaError, setCaptchaError] = useState(false);
    const [guestbookEntry, setGuestbookEntry] = useState({
        text: "",
        signer_email: "",
        donation_info: ""
    });
    const [captcha, setCaptcha] = useState("");

    const submitEntry = event => {
        event.preventDefault();

        axios
            .post(`/authors/${author.id}/guestbook`, null, {
                headers: {
                    "X-CSRF-Token": getAuthToken()
                },
                data: {
                    guestbook_entry: guestbookEntry,
                    captcha: captcha,
                    captcha_key: simpleCaptchaKey
                }
            })
            .then(response => {
                if (response.request.responseURL && response.status === 200) {
                    setCaptchaError(false);
                    window.location.href = response.request.responseURL;
                } else {
                    setCaptchaError(true);
                }
            });
    };

    const editGuestbookEntry = (key, value) => (
        setGuestbookEntry(prevState => (
            { ...prevState, [key]: value }
        ))
    );

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
                        <label htmlFor="captcha" className="label label--required">
                            Please complete the captcha below
                        </label>
                        <div className="simple_captcha_image">
                            <img src={simpleCaptchaImageUrl} alt="captcha"></img>
                        </div>
                        <div className="simple_captcha_field">
                            <input
                                type="text"
                                name="captcha"
                                id="captcha"
                                className="text-field"
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                required="required"
                                placeholder="Enter the image value (case sensitive)"
                                value={captcha}
                                onChange={e => setCaptcha(e.target.value)}
                            ></input>
                        </div>
                        {captchaError && (
                            <div className="error-message">
                                Incorrect image value, please try again.
                            </div>
                        )}
                    </div>
                    <div className="guestbook-entry-form__button-container">
                        <button type="submit" className="button button--primary">Send</button>
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
