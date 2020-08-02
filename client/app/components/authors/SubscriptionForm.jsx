import React, { useState } from "react";
import axios from "axios";

const SubscriptionForm = ({ subscribedToAuthor, subscriptionForAuthor, subscriptionSuccess, author, authenticityToken }) => {
    const [email, setEmail] = useState("");

    const emailSubscribe = event => {
        event.preventDefault();

        axios
            .post(`/authors/${author.id}/email_subscribe`, null, {
                headers: {
                    "X-CSRF-Token": authenticityToken,
                },
                data: {
                    email: email
                }
            })
            .then(response => {
                window.location.href = response.request.responseURL;
            })
    };

    return (
        <div>
            {subscribedToAuthor ? (
                subscriptionSuccess || !subscriptionForAuthor.verified ? (
                    <div className="sublabel succes">
                        <span>Success. Please check your email to confirm your subscription.</span>
                    </div>
                ) : (
                    <div className="sublabel">You're subscribed to this blog.</div>
                )
            ) : (
                <form onSubmit={e => emailSubscribe(e)}>
                    <label>Subscribe to @{author.username}'s posts</label>
                    <div className="sublabel">You'll only receive email when {author.title} publishes a new post</div>
                    <input
                        type="email"
                        id="email"
                        placeholder="Your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    ></input>
                </form>
            )}
        </div>
    );
};

export default props => <SubscriptionForm {...props} />;
