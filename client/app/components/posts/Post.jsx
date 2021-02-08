import React from "react";
import dayjs from "dayjs";
import SVG from "react-inlinesvg";
import { IcArrowLong } from "../../assets/icons";
import "./Post.scss";

const Post = ({ truncate, post }) => {
    // HTML has already been sanitized on Rails side
    const previewText = { __html: post.preview_text };
    const renderedText = { __html: post.rendered_text };

    const renderTruncatePost = () => (
        <>
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
            {!post.unlisted && (
                <a className="block read-more-link" href={post.author_relative_url}>
                    Read post
                    <SVG src={IcArrowLong} className="read-more-link__icon" />
                </a>
            )}
        </>
    );

    const renderPost = () => (
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

    return (
        <div className={`post-content ${truncate === true ? "post-preview" : ""}`}>
            {truncate ? renderTruncatePost() : renderPost()}
        </div>
    );
};

export default Post;
