import React from "react";

export default ({ authorUrl, author, confirmUrl }) => {
    return (
        <div>
            <p>
                Please confirm your subscription to{" "}
                <a href={authorUrl}>{author.title}</a>
                {" "}on Listed.
            </p>
            <p>
                <a href={confirmUrl}>Confirm Subscription</a>
            </p>
            <p>
                Or, click this link:{" "}
                <a href={confirmUrl}>{confirmUrl}</a>
            </p>
        </div>
    );
};
