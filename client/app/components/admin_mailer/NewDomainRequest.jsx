import React from "react";

export default ({ username, id, domain, email }) => {
    return (
        <div>
            <p>A new domain request is ready for review.</p>
            <p>Author: {username}</p>
            <p>Author ID: {id}</p>
            <p>Request domain: {domain}</p>
            <p>Author email: {email}</p>
        </div>
    );
};
