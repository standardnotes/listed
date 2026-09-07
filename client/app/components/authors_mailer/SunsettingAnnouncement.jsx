import PropTypes from "prop-types";
import React from "react";

const SunsettingAnnouncement = ({ hasCustomDomain, preview }) => (
    <div>
        <span
            className="preview"
            style={{
                display: "none !important",
                visibility: "hidden",
                opacity: 0,
                color: "transparent",
                height: 0,
                width: 0,
            }}
        >
            {preview}
        </span>
        <p>Hi there,</p>
        <p>
            We're writing to let you know that as of December 31, 2026, we'll be retiring the Listed
            platform. Since you used Listed in the past, we wanted to let you know what this means for you.
        </p>
        <ul>
            <li>
                Your posts will remain privately stored in your Standard Notes account, so you'll still be
                able to access them.
            </li>
            <li>
                The website and your blog, including past posts and guestbook, will no longer be publicly
                accessible.
            </li>
            <li>
                The Listed interface, such as blog settings, will be removed from the Standard Notes app.
            </li>
            {hasCustomDomain && (
                <li>
                    Your custom domain will stop serving your blog when Listed is retired. To use it elsewhere,
                    update your domain's DNS settings and remove or replace the A record pointing to Listed.
                </li>
            )}
        </ul>
        <p>
            We launched Listed in 2019 as an experimental feature to give Standard Notes writers a way to
            publish their work. In recent years, however, the feature has become virtually unused as many
            other platforms supporting writers have emerged. So we've decided to sunset Listed and stay
            focused on our founding mission: to build the best privacy-first note-taking app available.
        </p>
        <p>
            To that end, 2026 is a big year at Standard Notes. From new language support to improved note
            search, we're rolling out some of our most-requested new features. You can{" "}
            <a href="https://standardnotes.com/blog/2025-update">see what's coming this year</a> on our blog.
        </p>
        <p>
            If you have any questions or concerns, please contact our team at help@standardnotes.com.
            Thank you for supporting Standard Notes.
        </p>
        <p>Stay secure,</p>
        <p>The Standard Notes team</p>
    </div>
);

SunsettingAnnouncement.propTypes = {
    hasCustomDomain: PropTypes.bool.isRequired,
    preview: PropTypes.string.isRequired,
};

export default SunsettingAnnouncement;
