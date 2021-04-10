import PropTypes from "prop-types";
import React from "react";

const VerifyEmail = ({ displayName, verificationLink }) => (
    <div>
        <h3>
            Hey
            {displayName}
            ,
        </h3>
        <p>
            Please verify your email address by clicking the link below.
        </p>
        <a href={verificationLink}>{verificationLink}</a>
    </div>
);

VerifyEmail.propTypes = {
    displayName: PropTypes.string.isRequired,
    verificationLink: PropTypes.string.isRequired,
};

export default VerifyEmail;
