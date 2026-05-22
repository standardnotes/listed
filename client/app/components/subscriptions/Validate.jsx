import PropTypes from "prop-types";
import React, { useState, useCallback, useRef, useEffect } from "react";
import axios from "axios";
import Captcha from "../shared/Captcha";
import ErrorToast from "../shared/ErrorToast";
import getAuthToken from "../../utils/getAuthToken";
import "./Validate.scss";

const Validate = ({ subscription, captchaUIUrl }) => {
    const [captchaResetKey, setCaptchaResetKey] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isErrorToastDisplayed, setIsErrorToastDisplayed] = useState(false);
    const [errorToastMessage, setErrorToastMessage] = useState("");
    const isSubmittingRef = useRef(false);

    const captchaRequired = Boolean(captchaUIUrl);

    const submitValidation = useCallback(async (token) => {
        if (isSubmittingRef.current) {
            return;
        }

        isSubmittingRef.current = true;
        setIsSubmitting(true);
        setIsErrorToastDisplayed(false);

        try {
            const response = await axios
                .post(`/subscriptions/${subscription.id}/submit_validate`, null, {
                    headers: {
                        "X-CSRF-Token": getAuthToken(),
                    },
                    data: {
                        token: token || "",
                    },
                });

            Turbolinks.visit(response.request.responseURL);
        } catch (err) {
            setCaptchaResetKey((key) => key + 1);
            setErrorToastMessage("There was an error trying to validate your subscription. Please try again.");
            setIsErrorToastDisplayed(true);
            isSubmittingRef.current = false;
            setIsSubmitting(false);
        }
    }, [subscription.id]);

    const handleCaptchaVerify = useCallback((token) => {
        if (!token || isSubmittingRef.current) {
            return;
        }

        submitValidation(token);
    }, [submitValidation]);

    useEffect(() => {
        if (!captchaRequired) {
            submitValidation("");
        }
    }, [captchaRequired, submitValidation]);

    return (
        <div className="validate-page page-container">
            <h1 className="h1">Subscribe</h1>
            <p className="p1">
                {isSubmitting
                    ? "Verifying your subscription…"
                    : (
                        <>
                            Please complete the captcha below to finalize your subscription to
                            {" "}
                            <strong>{subscription.author.title}</strong>
                            .
                        </>
                    )}
            </p>
            <div id="captcha-form">
                {captchaRequired ? (
                    <Captcha
                        captchaUIUrl={captchaUIUrl}
                        onVerify={handleCaptchaVerify}
                        resetKey={captchaResetKey}
                    />
                ) : (
                    isSubmitting && <p className="p1">Verifying…</p>
                )}
            </div>
            <ErrorToast
                message={errorToastMessage}
                isDisplayed={isErrorToastDisplayed}
                setIsDisplayed={setIsErrorToastDisplayed}
            />
        </div>
    );
};

Validate.propTypes = {
    captchaUIUrl: PropTypes.string,
    subscription: PropTypes.shape({
        author: PropTypes.shape({
            title: PropTypes.string.isRequired,
        }),
        id: PropTypes.number.isRequired,
    }).isRequired,
};

Validate.defaultProps = {
    captchaUIUrl: "",
};

export default (props) => <Validate {...props} />;
