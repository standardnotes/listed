import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import axios from "axios";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import ErrorToast from "../shared/ErrorToast";
import getAuthToken from "../../utils/getAuthToken";
import "./New.scss";

const NewReaction = ({ post, reactionString, hCaptchaSiteKey }) => {
    const [captchaToken, setCaptchaToken] = useState("");
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [isErrorToastDisplayed, setIsErrorToastDisplayed] = useState(false);
    const [errorToastMessage, setErrorToastMessage] = useState("");

    const [showCaptcha, setShowCaptcha] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setShowCaptcha(true);
    }, []);

    const submitValidate = async (event) => {
        event.preventDefault();
        setIsSubmitDisabled(true);
        setIsErrorToastDisplayed(false);

        try {
            await axios.post(`/authors/${post.author.id}/posts/${post.id}/reactions`, null, {
                headers: {
                    "X-CSRF-Token": getAuthToken(),
                },
                data: {
                    reaction_string: reactionString,
                    token: captchaToken,
                },
            });

            setSuccess(true);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error("Caught error:", err);
            setIsSubmitDisabled(false);
            setErrorToastMessage("There was an error trying to validate your reaction. Please try again.");
            setIsErrorToastDisplayed(true);
        }
    };

    useEffect(() => {
        setIsSubmitDisabled(!captchaToken);
    }, [captchaToken]);

    return (
        <div className="validate-page page-container">
            {success ? (
                <>
                    <h1 className="h1">React with {reactionString}</h1>
                    <p className="p1">
                        Your reaction has been sent to the author! Thanks for supporting their work and encouraging them
                        to make more of it.
                    </p>
                </>
            ) : (
                <>
                    <h1 className="h1">React with {reactionString}</h1>
                    <p className="p1">Complete the captcha below to send your reaction to the author.</p>
                    <div id="captcha-form">
                        <form onSubmit={(e) => submitValidate(e)}>
                            <div className="form-section" suppressHydrationWarning>
                                {showCaptcha && (
                                    <HCaptcha
                                        id="hcaptcha"
                                        sitekey={hCaptchaSiteKey}
                                        onVerify={(token) => setCaptchaToken(token)}
                                    />
                                )}
                            </div>
                            <button
                                type="submit"
                                className={`button ${isSubmitDisabled ? "button--disabled" : "button--primary"}`}
                                disabled={isSubmitDisabled}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </>
            )}
            <ErrorToast
                message={errorToastMessage}
                isDisplayed={isErrorToastDisplayed}
                setIsDisplayed={setIsErrorToastDisplayed}
            />
        </div>
    );
};

NewReaction.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number.isRequired,
        author: PropTypes.shape({
            id: PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired,
    reactionString: PropTypes.string.isRequired,
    hCaptchaSiteKey: PropTypes.string.isRequired,
};

export default (props) => <NewReaction {...props} />;
