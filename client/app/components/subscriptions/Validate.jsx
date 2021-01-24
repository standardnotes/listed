import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import getAuthToken from "../../utils/getAuthToken";
import "./Validate.scss";

const Validate = ({ subscription, hCaptchaSiteKey }) => {
    const [captchaToken, setCaptchaToken] = useState("");
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const submitValidate = event => {
        event.preventDefault();

        axios
            .post(`/subscriptions/${subscription.id}/submit_validate`, null, {
                headers: {
                    "X-CSRF-Token": getAuthToken()
                },
                data: {
                    token: captchaToken
                }
            })
            .then(response => {
                Turbolinks.visit(response.request.responseURL);
            });
    };

    useEffect(() => {
        setShowCaptcha(true);
    }, []);

    useEffect(() => {
        setIsSubmitDisabled(!captchaToken);
    }, [captchaToken]);

    return (
        <div className="validate-page page-container">
            <h1 className="h1">Subscribe</h1>
            <p className="p1">
                Please complete the captcha below to finalize your subscription to{" "}
                <strong>{subscription.author.title}</strong>.
            </p>
            <div id="captcha-form">
                <form onSubmit={e => submitValidate(e)}>
                    <div className="form-section" suppressHydrationWarning>
                        {showCaptcha && (
                            <HCaptcha
                                id="hcaptcha"
                                sitekey={hCaptchaSiteKey}
                                onVerify={token => setCaptchaToken(token)}
                            />
                        )}
                    </div>
                    <button
                        type="submit"
                        className={`button ${isSubmitDisabled ? "button--disabled" : "button--primary"}`}
                        disabled={isSubmitDisabled}
                    >
                        Verify Subscription
                    </button>
                </form>
            </div>
        </div>
    );
};

export default props => <Validate {...props} />;