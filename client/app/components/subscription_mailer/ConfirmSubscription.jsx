import PropTypes from "prop-types";
import React from "react";

const ConfirmSubscription = ({ authorUrl, author, confirmUrl }) => (
    <div>
        <p>
            Please confirm your subscription to
            {" "}
            <a href={authorUrl}>{author.title}</a>
            {" "}
            on Listed.
        </p>
        <p>
            <a href={confirmUrl}>Confirm Subscription</a>
        </p>
        <p>
            Or, click this link:
            {" "}
            <a href={confirmUrl}>{confirmUrl}</a>
        </p>
    </div>
);

ConfirmSubscription.propTypes = {
    author: PropTypes.shape({
        title: PropTypes.string.isRequired,
    }).isRequired,
    authorUrl: PropTypes.string.isRequired,
    confirmUrl: PropTypes.string.isRequired,
};

export default ConfirmSubscription;
