import React from "react";
import EditAuthor from "./settings/EditAuthor";
import PaymentDetails from "./settings/PaymentDetails";

export default ({ author, authenticityToken }) => {
    return (
        <div id="settings" className="sn-component single-post-show">
            <h3>Settings</h3>
            <div className="urls">
                <p className="header">
                    Your public blog is accessible via:
                </p>
                {author.accessible_via.map(url => (
                    <p key={url} className="url">
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            {url}
                        </a>
                    </p>
                ))}
            </div>
            <EditAuthor author={author} authenticityToken={authenticityToken} />
            <PaymentDetails author={author} />
        </div>
    );
};
