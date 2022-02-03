import PropTypes from "prop-types";
import React from "react";

const Unsubscribe = ({ subscription }) => (
    <div className="page-container">
        <p>
            You&apos;ve been successfully unsubscribed from
            {" "}
            {subscription.author.title}
            &apos;s posts.
        </p>
    </div>
);

Unsubscribe.propTypes = {
    subscription: PropTypes.shape({
        author: PropTypes.shape({
            title: PropTypes.string.isRequired,
        }),
    }).isRequired,
};

export default Unsubscribe;
