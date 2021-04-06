import PropTypes from "prop-types";
import React from "react";
import dayjs from "dayjs";
import SVG from "react-inlinesvg";
import { IcArrowLong } from "../../assets/icons";
import "./Post.scss";

const Post = ({ truncate, post, isMainPost }) => {
    // HTML has already been sanitized on Rails side
    const previewText = { __html: post.preview_text };
    const renderedText = { __html: post.rendered_text };

    const renderDateAndWordCount = () => (
        <>
            {`${dayjs(post.created_at).format("MMMM D, YYYY")}`}
            <span className="post-date__separator">•</span>
            {post.word_count.toLocaleString()}
            {" "}
            words
        </>
    );

    const renderTruncatePost = () => (
        <>
            <div className="post-header">
                <h5 className="post-title h5">
                    <a className="post-title" href={post.author_relative_url}>
                        {post.title}
                    </a>
                </h5>
                {post.page || (
                    <p className="post-date p3">
                        {renderDateAndWordCount()}
                    </p>
                )}
            </div>
            <div className="post-body p2">
                {/* eslint-disable-next-line react/no-danger */}
                <div className="post-preview-body" dangerouslySetInnerHTML={previewText} />
            </div>
            {!post.unlisted && (
                <a className="block read-more-link" href={post.author_relative_url}>
                    Read post
                    <SVG src={IcArrowLong} className="read-more-link__icon" />
                </a>
            )}
        </>
    );

    const renderHeading = () => {
        const content = (
            <a className="post-title" href={post.author_relative_url}>
                {post.title}
            </a>
        );
        if (isMainPost) {
            return (
                <h1 className="post-title h1">
                    {content}
                </h1>
            );
        }
        return (
            <h2 className="post-title h2">
                {content}
            </h2>
        );
    };

    const renderPost = () => (
        <>
            <div className="post-header">
                {post.unlisted ? (
                    <h2 className="post-title h2">{post.title}</h2>
                ) : (
                    !post.page && (
                        renderHeading()
                    )
                )}
                {post.page || (
                    <p className={`post-date ${isMainPost ? "p2" : "p3"}`}>
                        {renderDateAndWordCount()}
                    </p>
                )}
            </div>
            {/* eslint-disable-next-line react/no-danger */}
            <div className={`post-body p1 ${!isMainPost ? "post-body--small-heading" : ""}`} dangerouslySetInnerHTML={renderedText} />
        </>
    );

    return (
        <div className={`post-content ${truncate === true ? "post-preview" : ""}`}>
            {truncate ? renderTruncatePost() : renderPost()}
        </div>
    );
};

Post.propTypes = {
    post: PropTypes.shape({
        author_relative_url: PropTypes.string,
        created_at: PropTypes.string.isRequired,
        page: PropTypes.bool,
        preview_text: PropTypes.string.isRequired,
        rendered_text: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        unlisted: PropTypes.bool.isRequired,
        word_count: PropTypes.number.isRequired,
    }).isRequired,
    truncate: PropTypes.bool,
    isMainPost: PropTypes.bool,
};

Post.defaultProps = {
    truncate: false,
    isMainPost: false,
};

export default Post;
