import PropTypes from "prop-types";
import React from "react";

const UpdateFrequency = ({ subscription }) => (
    <div className="page-container">
        <p>
            Success. You will now only receive updates from
            {" "}
            {subscription.author.title}
            {" "}
            once a week, if any new content is available.
        </p>
    </div>
);

UpdateFrequency.propTypes = {
    subscription: PropTypes.shape({
        author: PropTypes.shape({
            title: PropTypes.string.isRequired,
        }),
    }).isRequired,
};

export default UpdateFrequency;
