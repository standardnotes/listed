import React from "react";

export default ({ author }) => {
    return (
        <div>
            <p>
                Good news! Someone just subscribed to your blog.
                They'll automatically be notified every time you publish a new post.
            </p>
            <p>
                You now have {author.verified_subscriptions.length} subscriber(s). Keep up the good work!
            </p>
        </div>
    );
};
