import PropTypes from "prop-types";
import React from "react";

const NewPost = ({ hiddenText, post, renderedText, weeklyUrl, unsubscribeUrl, reactionLinks }) => {
    const renderedTextHtml = { __html: renderedText };

    return (
        <div>
            <span
                className="preheader"
                style={{
                    display: "none !important",
                    visibility: "hidden",
                    opacity: 0,
                    color: "transparent",
                    height: 0,
                    width: 0,
                }}
            >
                {hiddenText}
            </span>
            <p>
                A blog you&apos;re subscribed to,{" "}
                <a className="unstyled" href={post.author.url}>
                    {post.author.title}
                </a>
                , published a new post:
            </p>
            <h3>
                <a className="unstyled" href={post.url}>
                    {post.title}
                </a>
            </h3>
            <div className="post-content">
                {/* eslint-disable-next-line react/no-danger */}
                <div className="post-body" dangerouslySetInnerHTML={renderedTextHtml} />
            </div>
            <hr />
            <div className="post-footer">
                <p>
                    <i>
                        The full post text is displayed above.{" "}
                        <span>
                            <a href={post.url}>Read on website.</a>
                        </span>
                    </i>
                </p>
                {post.author.email && post.author.email.length > 0 && (
                    <p>
                        <i>You can reply to the author by replying directly to this email.</i>
                    </p>
                )}

                <p>Share your anonymous reaction to this post with the author—it would mean a lot to them!</p>
                <div className="reaction-links">
                    {reactionLinks.map((link) => (
                        <a className="reaction-link" href={link.url}>
                            {link.reaction}
                        </a>
                    ))}
                </div>

                <div className="links-footer" style={{ marginBottom: "20px" }}>
                    {weeklyUrl && <a href={weeklyUrl}>Receive Weekly Updates Instead</a>}
                    <a href={unsubscribeUrl}>Unsubscribe</a>
                </div>
                <div className="bottom-margin-space" />
            </div>
        </div>
    );
};

NewPost.propTypes = {
    hiddenText: PropTypes.string.isRequired,
    reactionLinks: PropTypes.arrayOf({
        reaction: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    }).isRequired,
    post: PropTypes.shape({
        author: PropTypes.shape({
            email: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }),
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    }).isRequired,
    renderedText: PropTypes.string.isRequired,
    unsubscribeUrl: PropTypes.string.isRequired,
    weeklyUrl: PropTypes.string.isRequired,
};

export default NewPost;
