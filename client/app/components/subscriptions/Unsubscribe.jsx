import PropTypes from "prop-types";
import React from "react";

const Unsubscribe = ({ subscription }) => (
    <p>
        You&apos;ve been successfully unsubscribed from
        {" "}
        {subscription.author.title}
        &apos;s posts.
    </p>
);

Unsubscribe.propTypes = {
    subscription: PropTypes.shape({
        author: PropTypes.shape({
            title: PropTypes.string.isRequired,
        }),
    }).isRequired,
};

export default Unsubscribe;
