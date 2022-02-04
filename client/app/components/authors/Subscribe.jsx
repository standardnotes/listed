import PropTypes from "prop-types";
import React from "react";
import SubscriptionForm from "./SubscriptionForm";
import "./Subscribe.scss";

const Subscribe = ({
    displayAuthor, subscribedToAuthor, subscriptionForAuthor, subscriptionSuccess,
}) => (
    <div id="subscribe-page" className="page-container">
        <h1 className="h1">Subscribe</h1>
        {(!subscribedToAuthor || !subscriptionForAuthor.verification_sent_at) && (
            <>
                <p className="p1">
                    You&apos;ll only receive email when the author publishes something new.
                    {" "}
                    { displayAuthor.title }
                    {" "}
                    will not be able to see your email.
                </p>
            </>
        )}
        <div id="subscription-form">
            <SubscriptionForm
                subscribedToAuthor={subscribedToAuthor}
                subscriptionForAuthor={subscriptionForAuthor}
                subscriptionSuccess={subscriptionSuccess}
                author={displayAuthor}
            />
        </div>
        {(!subscribedToAuthor || !subscriptionForAuthor.verification_sent_at) && (
            <p className="p1 subscribe-page__rss-feed">
                Or view their
                {" "}
                <a href={displayAuthor.rss_url} data-turbolinks="false">RSS feed</a>
                .
            </p>
        )}
    </div>
);

Subscribe.propTypes = {
    displayAuthor: PropTypes.shape({
        rss_url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
    subscribedToAuthor: PropTypes.bool.isRequired,
    subscriptionForAuthor: PropTypes.shape({
        verification_sent_at: PropTypes.string.isRequired,
    }).isRequired,
    subscriptionSuccess: PropTypes.bool.isRequired,
};

export default Subscribe;
