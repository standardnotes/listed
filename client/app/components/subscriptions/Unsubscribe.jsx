import React from "react";

export default ({ subscription }) => (
    <p>
        You&apos;ve been successfully unsubscribed from
        {" "}
        {subscription.author.title}
        &apos;s posts.
    </p>
);
