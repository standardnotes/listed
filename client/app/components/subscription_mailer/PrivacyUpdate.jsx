import PropTypes from "prop-types";
import React from "react";

const PrivacyUpdate = ({ subscriber, author, unsubscribeUrl }) => (
    <div>
        <p>Hello {subscriber.email},</p>

        <p>
            You are currently subscribed to{" "}
            <strong>
                <a href={author.url}>{author.title}</a>
            </strong>
            's blog on Listed.
        </p>

        <p>We're writing to inform you about an important update to Listed's privacy policy.</p>

        <p>
            Starting December 1st, blog authors will be able to see the email addresses of their subscribers. Learn more about this update at{" "}
            <a href="https://listed.to/@Listed/56444/unlocking-subscriber-portability">
                https://listed.to/@Listed/56444/unlocking-subscriber-portability
            </a>
            .
        </p>

        <p>What this means for you:</p>
        <ul>
            <li>
                <a href={author.url}>{author.title}</a> will be able to see your email address ({subscriber.email})
            </li>
            <li>This enables direct communication between you and the author</li>
            <li>Your email will only be visible to authors whose blogs you're subscribed to</li>
        </ul>

        <p>
            If you'd prefer not to share your email address with <a href={author.url}>{author.title}</a>, you can
            unsubscribe using the link below before this change takes effect.
        </p>

        <div className="links-footer">
            <a href={unsubscribeUrl}>Unsubscribe from {author.title}'s blog</a>
        </div>
    </div>
);

PrivacyUpdate.propTypes = {
    subscriber: PropTypes.shape({
        email: PropTypes.string.isRequired,
    }).isRequired,
    author: PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    }).isRequired,
    unsubscribeUrl: PropTypes.string.isRequired,
};

export default PrivacyUpdate;
