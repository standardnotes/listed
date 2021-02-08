import PropTypes from "prop-types";
import React from "react";

const VerifyEmail = ({ author, verificationLink }) => (
    <div>
        <h3>
            Hey
            {author.display_name}
            ,
        </h3>
        <p>
            Please verify your email address by clicking the link below.
        </p>
        <a href={verificationLink}>{verificationLink}</a>
    </div>
);

VerifyEmail.propTypes = {
    author: PropTypes.shape({
        display_name: PropTypes.string.isRequired,
    }).isRequired,
    verificationLink: PropTypes.string.isRequired,
};

export default VerifyEmail;
