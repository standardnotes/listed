import React, { useState } from 'react';
import axios from 'axios';

const Validate = ({ subscription, authenticityToken, simpleCaptchaKey, simpleCaptchaImageUrl }) => {
    const [captcha, setCaptcha] = useState("");

    const submitValidate = event => {
        event.preventDefault();

        axios
            .post(`/subscriptions/${subscription.id}/submit_validate`, null, {
                headers: {
                    "X-CSRF-Token": authenticityToken,
                },
                data: {
                    captcha: captcha,
                    captcha_key: simpleCaptchaKey
                }
            })
            .then(response => {
                window.location.href = response.request.responseURL;
            });
    };

    return (
        <div>
            <p>
                Please complete the captcha below to finalize your subscription to{" "}
                <strong>{subscription.author.title}</strong>.
            </p>
            <div id="captcha-form" className="form-box">
                <form onSubmit={e => submitValidate(e)}>
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
                    <div className="mt-10">
                        <input type="submit" value="Verify Subscription"></input>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default props => <Validate {...props} />;