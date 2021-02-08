import PropTypes from "prop-types";
import React from "react";

const NewSubscription = ({ author }) => (
    <div>
        <p>
            Good news! Someone just subscribed to your blog.
            They&apos;ll automatically be notified every time you publish a new post.
        </p>
        <p>
            You now have
            {" "}
            {author.verified_subscriptions.length}
            {" "}
            subscriber(s). Keep up the good work!
        </p>
    </div>
);

NewSubscription.propTypes = {
    author: PropTypes.shape({
        verified_subscriptions: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
            }),
        ).isRequired,
    }).isRequired,
};

export default NewSubscription;
