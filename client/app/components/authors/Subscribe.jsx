import React from "react";
import SubscriptionForm from "./SubscriptionForm";

export default ({ displayAuthor, subscribedToAuthor, subscriptionForAuthor, subscriptionSuccess, authenticityToken }) => {
    return (
        <div id="subscribe-page" className="single-post-show">
            <p>
                You can follow along with
                <strong> {displayAuthor.title} </strong>
                by subscribing to updates via email, or via their{" "}
                <a href={displayAuthor.rss_url} data-turbolinks="false">RSS feed</a>.
            </p>
            <div id="subscription-form" className="form-box">
                <SubscriptionForm
                    subscribedToAuthor={subscribedToAuthor}
                    subscriptionForAuthor={subscriptionForAuthor}
                    subscriptionSuccess={subscriptionSuccess}
                    author={displayAuthor}
                    authenticityToken={authenticityToken}
                >
                </SubscriptionForm>
            </div>
        </div>
    );
};
