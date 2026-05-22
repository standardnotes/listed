import PropTypes from "prop-types";
import React, { useState, useCallback, useRef, useEffect } from "react";
import axios from "axios";
import Captcha from "../shared/Captcha";
import ErrorToast from "../shared/ErrorToast";
import getAuthToken from "../../utils/getAuthToken";
import "./New.scss";

const NewReaction = ({ post, reactionString, captchaUIUrl }) => {
    const [captchaResetKey, setCaptchaResetKey] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isErrorToastDisplayed, setIsErrorToastDisplayed] = useState(false);
    const [errorToastMessage, setErrorToastMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const isSubmittingRef = useRef(false);

    const captchaRequired = Boolean(captchaUIUrl);

    const submitReaction = useCallback(async (token) => {
        if (isSubmittingRef.current) {
            return;
        }

        isSubmittingRef.current = true;
        setIsSubmitting(true);
        setIsErrorToastDisplayed(false);

        try {
            await axios.post(`/authors/${post.author.id}/posts/${post.id}/reactions`, null, {
                headers: {
                    "X-CSRF-Token": getAuthToken(),
                },
                data: {
                    reaction_string: reactionString,
                    token: token || "",
                },
            });

            setSuccess(true);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error("Caught error:", err);
            setCaptchaResetKey((key) => key + 1);
            setErrorToastMessage("There was an error trying to validate your reaction. Please try again.");
            setIsErrorToastDisplayed(true);
        } finally {
            isSubmittingRef.current = false;
            setIsSubmitting(false);
        }
    }, [post.author.id, post.id, reactionString]);

    const handleCaptchaVerify = useCallback((token) => {
        if (!token || isSubmittingRef.current) {
            return;
        }

        submitReaction(token);
    }, [submitReaction]);

    useEffect(() => {
        if (!captchaRequired && !success) {
            submitReaction("");
        }
    }, [captchaRequired, success, submitReaction]);

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
                    <p className="p1">
                        {isSubmitting
                            ? "Sending your reaction…"
                            : "Complete the captcha below to send your reaction to the author."}
                    </p>
                    <div id="captcha-form">
                        {captchaRequired ? (
                            <Captcha
                                captchaUIUrl={captchaUIUrl}
                                onVerify={handleCaptchaVerify}
                                resetKey={captchaResetKey}
                            />
                        ) : (
                            isSubmitting && <p className="p1">Sending…</p>
                        )}
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
    captchaUIUrl: PropTypes.string,
};

NewReaction.defaultProps = {
    captchaUIUrl: "",
};

export default (props) => <NewReaction {...props} />;
