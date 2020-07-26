import React, { useState } from "react";
import axios from "axios";

const New = ({ author, authenticityToken, simpleCaptchaKey, simpleCaptchaImageUrl }) => {
    const [captchaError, setCaptchaError] = useState(false);
    const [guestbookEntry, setGuestbookEntry] = useState({
        text: "",
        signer_email: "",
        donation_info: ""
    });
    const [captcha, setCaptcha] = useState("");

    const submitEntry = event => {
        event.preventDefault();
        setCaptchaError(false);

        axios
            .post(`/authors/${author.id}/guestbook`, null, {
                headers: {
                    "X-CSRF-Token": authenticityToken,
                },
                data: {
                    guestbook_entry: guestbookEntry,
                    captcha: captcha,
                    captcha_key: simpleCaptchaKey
                }
            })
            .then(response => {
                if (response.request.responseURL) {
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
        <div>
            <p>
                Sign
                <strong> {author.title}'s </strong>
                guestbook.
            </p>
            <div className="mt-20 form-box full guestbook-entry-form">
                <form onSubmit={e => submitEntry(e)}>
                    <div className="form-section">
                        <label className="label">
                            Your message
                        </label>
                        <textarea
                            className="field text-input tall"
                            value={guestbookEntry.text}
                            onChange={e => editGuestbookEntry("text", e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-section mt-10">
                        <label className="label">
                            Your email (optional)
                        </label>
                        <input
                            className="field text-input"
                            value={guestbookEntry.signer_email}
                            onChange={e => editGuestbookEntry("signer_email", e.target.value)}
                        ></input>
                    </div>
                    <div className="form-section mt-10">
                        <label className="label">
                            Donation info (optional)
                        </label>
                        <div style={{ fontSize: "14px", opacity: 0.5, marginBottom: "5px" }}>
                            If you've made a contribution, feel free to let the author know the method you've used, and the amount.
                        </div>
                        <textarea
                            className="field text-input mid-tall"
                            value={guestbookEntry.donation_info}
                            onChange={e => editGuestbookEntry("donation_info", e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-section mt-10">
                        <label className="label">
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
                            <div style={{ fontSize: "14px", color: "#ff5d5d", marginTop: "5px" }}>
                                Incorrect image value, please try again
                            </div>
                        )}
                    </div>
                    <div className="form-section mt-20">
                        <input type="submit" value="Send"></input>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default props => <New {...props} />;
