import React, { useState } from "react";
import axios from "axios";
import getAuthToken from "../../utils/getAuthToken";
import "./SubscriptionForm.scss";

const SubscriptionForm = ({
    subscribedToAuthor, subscriptionForAuthor, subscriptionSuccess, author,
}) => {
    const [email, setEmail] = useState("");

    const emailSubscribe = (event) => {
        event.preventDefault();

        axios
            .post(`/authors/${author.id}/email_subscribe`, null, {
                headers: {
                    "X-CSRF-Token": getAuthToken(),
                },
                data: {
                    email,
                },
            })
            .then((response) => {
                Turbolinks.visit(response.request.responseURL);
            });
    };

    const renderForm = () => {
        if (subscribedToAuthor && subscriptionForAuthor.verification_sent_at) {
            return (
                subscriptionSuccess || !subscriptionForAuthor.verified ? (
                    <div className="callout callout--success">
                        Success. Please check your email to confirm your subscription.
                    </div>
                ) : (
                    <div className="callout callout--success">You&apos;re subscribed to this blog.</div>
                )
            );
        }

        return (
            <form onSubmit={(e) => emailSubscribe(e)}>
                <div>
                    <input
                        type="email"
                        id="email"
                        className="text-field"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit" className="button button--primary">Subscribe</button>
                </div>
            </form>
        );
    };

    return (
        <div>
            {renderForm()}
        </div>
    );
};

export default (props) => <SubscriptionForm {...props} />;
