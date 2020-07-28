import React from "react";

export default ({ subscription }) => {
    return (
        <p>
            You've been successfully unsubscribed from {subscription.author.title}'s posts.
        </p>
    );
};
