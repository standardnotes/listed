import PropTypes from "prop-types";
import React from "react";

const UpdateFrequency = ({ subscription }) => (
    <p>
        Success. You will now only receive updates from
        {" "}
        {subscription.author.title}
        {" "}
        once a week, if any new content is available.
    </p>
);

UpdateFrequency.propTypes = {
    subscription: PropTypes.shape({
        author: PropTypes.shape({
            title: PropTypes.string.isRequired,
        }),
    }).isRequired,
};

export default UpdateFrequency;
