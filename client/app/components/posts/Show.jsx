import PropTypes from "prop-types";
import React from "react";
import Post from "./Post";
import SubscriptionForm from "../authors/SubscriptionForm";
import ScrollToTopButton from "../shared/ScrollToTopButton";
import "./Show.scss";

const Show = ({
    post,
    previous,
    next,
    subscribedToAuthor,
    subscriptionForAuthor,
    subscriptionSuccess,
    reactionLinks,
}) => (
    <div>
        <div className="single-post-show">
            <Post post={post} isMainPost reactionLinks={reactionLinks} />
            {!post.unlisted && (
                <div>
                    <div className="reaction-links">
                        <div className="header h4">React to this post</div>
                        {reactionLinks.map((link) => (
                            <a key={link.url} className="reaction-link" href={link.url}>
                                {link.reaction}
                            </a>
                        ))}
                    </div>
                    <hr />
                    {!post.author.newsletter_disabled && (
                        <div id="subscription-form">
                            <label htmlFor="email" className="h4">
                                Subscribe to the author
                            </label>
                            {(!subscribedToAuthor || !subscriptionForAuthor.verification_sent_at) && (
                                <p className="sublabel p2">
                                    You&apos;ll only receive email when they publish something new.
                                </p>
                            )}
                            <SubscriptionForm
                                subscribedToAuthor={subscribedToAuthor}
                                subscriptionForAuthor={subscriptionForAuthor}
                                subscriptionSuccess={subscriptionSuccess}
                                author={post.author}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
        {(previous || next) && !post.unlisted && (
            <div id="single-post-footer">
                <h3 className="more-from h3">
                    More from {post.author.title}
                    <div className="headline-separator" />
                    <a href={`${post.author.url}/all`} className="all-posts">
                        All posts
                    </a>
                </h3>
                <div className="previous-next-container">
                    {previous && (
                        <div className="previous card">
                            <Post post={previous} truncate />
                        </div>
                    )}
                    {next && (
                        <div className="next card">
                            <Post post={next} truncate />
                        </div>
                    )}
                </div>
            </div>
        )}
        <ScrollToTopButton />
    </div>
);

Show.propTypes = {
    next: PropTypes.shape({}).isRequired,
    post: PropTypes.shape({
        author: PropTypes.shape({
            newsletter_disabled: PropTypes.bool.isRequired,
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }).isRequired,
        page: PropTypes.bool.isRequired,
        unlisted: PropTypes.bool.isRequired,
    }).isRequired,
    reactionLinks: PropTypes.arrayOf({
        reaction: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    }).isRequired,
    previous: Post.propTypes.post.isRequired,
    subscribedToAuthor: PropTypes.bool.isRequired,
    subscriptionForAuthor: PropTypes.shape({
        verification_sent_at: PropTypes.string.isRequired,
    }).isRequired,
    subscriptionSuccess: PropTypes.bool.isRequired,
};

export default Show;
