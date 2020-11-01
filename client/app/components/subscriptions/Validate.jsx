import React, { useState } from 'react';
import axios from 'axios';
import getAuthToken from "../../utils/getAuthToken";
import "./Validate.scss";

const Validate = ({ subscription, simpleCaptchaKey, simpleCaptchaImageUrl }) => {
    const [captcha, setCaptcha] = useState("");

    const submitValidate = event => {
        event.preventDefault();

        axios
            .post(`/subscriptions/${subscription.id}/submit_validate`, null, {
                headers: {
                    "X-CSRF-Token": getAuthToken()
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
        <div className="validate-page page-container">
            <h1 className="h1">Subscribe</h1>
            <p className="p1">
                Please complete the captcha below to finalize your subscription to{" "}
                <strong>{subscription.author.title}</strong>.
            </p>
            <div id="captcha-form">
                <form onSubmit={e => submitValidate(e)}>
                    <div className="simple-capctha-image">
                        <img src={simpleCaptchaImageUrl} alt="captcha"></img>
                    </div>
                    <input
                        className="text-field simple-captcha-field"
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
                    <button type="submit" className="button button--primary">Verify Subscription</button>
                </form>
            </div>
        </div>
    );
};

export default props => <Validate {...props} />;