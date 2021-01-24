import React, { useState } from "react";
import axios from "axios";
import ErrorToast from "../shared/ErrorToast";
import getAuthToken from "../../utils/getAuthToken";
import "./SubscriptionForm.scss";

const SubscriptionForm = ({ subscribedToAuthor, subscriptionForAuthor, subscriptionSuccess, author }) => {
    const [email, setEmail] = useState("");
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const [isErrorToastDisplayed, setIsErrorToastDisplayed] = useState(false);
    const [errorToastMessage, setErrorToastMessage] = useState("");

    const emailSubscribe = async (event) => {
        event.preventDefault();
        setIsSubmitDisabled(true);
        setIsErrorToastDisplayed(false);

        try {
            const response = await axios
                .post(`/authors/${author.id}/email_subscribe`, null, {
                    headers: {
                        "X-CSRF-Token": getAuthToken(),
                    },
                    data: {
                        email: email
                    }
                });

            Turbolinks.visit(response.request.responseURL);
        } catch (err) {
            setIsSubmitDisabled(false);
            setErrorToastMessage("There was an error trying to subscribe you to this author. Please try again.");
            setIsErrorToastDisplayed(true);
        }
    };

    return (
        <div>
            {(subscribedToAuthor && subscriptionForAuthor.verification_sent_at) ? (
                subscriptionSuccess || !subscriptionForAuthor.verified ? (
                    <div className="callout callout--success">
                        Success. Please check your email to confirm your subscription.
                    </div>
                ) : (
                    <div className="callout callout--success">You're subscribed to this blog.</div>
                )
            ) : (
                <form onSubmit={e => emailSubscribe(e)}>
                    <div>
                        <input
                            type="email"
                            id="email"
                            className="text-field"
                            placeholder="Your email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        ></input>
                        <button
                            type="submit"
                            className={`button ${isSubmitDisabled ? "button--disabled" : "button--primary"}`}
                            disabled={isSubmitDisabled}
                        >
                            Subscribe
                        </button>
                    </div>
                </form>
                
            )}
            <ErrorToast
                message={errorToastMessage}
                isDisplayed={isErrorToastDisplayed}
                setIsDisplayed={setIsErrorToastDisplayed}
            />
        </div>
    );
};

export default props => <SubscriptionForm {...props} />;
