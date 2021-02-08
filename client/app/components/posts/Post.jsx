import PropTypes from "prop-types";
import React from "react";
import dayjs from "dayjs";
import SVG from "react-inlinesvg";
import { IcArrowLong } from "../../assets/icons";
import "./Post.scss";

const Post = ({ truncate = false, post }) => {
    // HTML has already been sanitized on Rails side
    const previewText = { __html: post.preview_text };
    const renderedText = { __html: post.rendered_text };

    const getTruncatePostContent = () => (
        <div>
            <div className="post-header">
                <h5 className="post-title h5">{post.title}</h5>
                {post.page || (
                    <p className="post-date p3">
                        {`${dayjs(post.created_at).format("MMMM D, YYYY")} · ${post.word_count} words`}
                    </p>
                )}
            </div>
            <div className="post-body p2">
                {/* eslint-disable-next-line react/no-danger */}
                <div className="post-preview-body" dangerouslySetInnerHTML={previewText} />
            </div>
            <a className="block read-more-link" href={post.author_relative_url}>
                Read post
                <SVG src={IcArrowLong} className="read-more-link__icon" />
            </a>
        </div>
    );

    const renderPost = () => {
        if (truncate) {
            return (
                post.unlisted ? (
                    getTruncatePostContent()
                )
                    : (
                        <a className="post-title" href={post.author_relative_url}>
                            {getTruncatePostContent()}
                        </a>
                    )
            );
        }

        return (
            <>
                <div className="post-header">
                    {post.unlisted ? (
                        <h2 className="post-title h2">{post.title}</h2>
                    ) : (
                        !post.page && (
                            <h2 className="post-title h2">
                                <a className="post-title" href={post.author_relative_url}>
                                    {post.title}
                                </a>
                            </h2>
                        )
                    )}
                    {post.page || (
                        <p className="post-date p3">
                            {`${dayjs(post.created_at).format("MMMM D, YYYY")} · ${post.word_count} words`}
                        </p>
                    )}
                </div>
                {/* eslint-disable-next-line react/no-danger */}
                <div className="post-body p1" dangerouslySetInnerHTML={renderedText} />
            </>
        );
    };

    return (
        <div className={`post-content ${truncate === true ? "post-preview" : ""}`}>
            {renderPost()}
        </div>
    );
};

Post.propTypes = {
    post: PropTypes.shape({
        author_relative_url: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        page: PropTypes.bool,
        preview_text: PropTypes.string.isRequired,
        rendered_text: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        unlisted: PropTypes.bool.isRequired,
        word_count: PropTypes.number.isRequired,
    }).isRequired,
    truncate: PropTypes.bool,
};

Post.defaultProps = {
    truncate: false,
};

export default Post;
