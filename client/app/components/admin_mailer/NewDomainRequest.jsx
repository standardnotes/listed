import React from "react";
import PropTypes from "prop-types";

const NewDomainRequest = ({
    username, id, domain, email,
}) => (
    <div>
        <p>A new domain request is ready for review.</p>
        <p>
            Author:
            {username}
        </p>
        <p>
            Author ID:
            {id}
        </p>
        <p>
            Request domain:
            {domain}
        </p>
        <p>
            Author email:
            {email}
        </p>
    </div>
);

NewDomainRequest.propTypes = {
    username: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    domain: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
};

export default NewDomainRequest;
