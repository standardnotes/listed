import PropTypes from "prop-types";
import React from "react";

const SubscriptionSuccess = ({ authorUrl, author, unsubscribeUrl }) => (
    <div>
        <p>
            You&apos;ll now read the latest from
            {" "}
            <a href={authorUrl}>{author.title}</a>
            {" "}
            when they publish on Listed.
        </p>
        <p>
            If this was made by mistake, you can
            {" "}
            <a href={unsubscribeUrl}>unsubscribe.</a>
        </p>
    </div>
);

SubscriptionSuccess.propTypes = {
    author: PropTypes.shape({
        title: PropTypes.string.isRequired,
    }).isRequired,
    authorUrl: PropTypes.string.isRequired,
    unsubscribeUrl: PropTypes.string.isRequired,
};

export default SubscriptionSuccess;
