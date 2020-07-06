import React from "react";
import axios from "axios";

export default ({ subscribedToAuthor, subscriptionForAuthor, subscriptionSuccess, author, authenticityToken }) => {
    const emailSubscribe = event => {
        event.preventDefault();

        axios
            .post(`/authors/${author.id}/email_subscribe`, null, {
                headers: {
                    "X-CSRF-Token": authenticityToken,
                },
            })
            .then(response => {
                window.location.href = response.request.responseURL;
            });
    };

    return (
        <div>
            {subscribedToAuthor ? (
                (subscriptionSuccess || !subscriptionForAuthor.verified) ? (
                    <div className="sublabel succes">
                        <span>Success. Please check your email to confirm your subscription.</span>
                    </div>
                ) : (
                    <div className="sublabel">
                        You're subscribed to this blog.
                    </div>
                )
            ) : (
                <form onSubmit={e => emailSubscribe(e)}>
                    <label>
                        Subscribe to @{author.username}'s posts
                    </label>
                    <div className="sublabel">
                        You'll only receive email when {author.title} publishes a new post
                    </div>
                    <input type="email" id="email" placeholder="Your email"></input>
                </form>
            )}
        </div>
    );
};
