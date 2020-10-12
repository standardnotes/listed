import React from "react";
import moment from "moment";
import "./Post.scss";

const Post = ({ truncate, post }) => {
    // HTML has already been sanitized on Rails side
    const previewText = { __html: post.preview_text };
    const renderedText = { __html: post.rendered_text };

    return (
        <div className={`post-content ${truncate == true ? "post-preview" : ""}`}>
            <div className="post-header">
                {post.unlisted ? (
                    <h2 className="post-title">{post.title}</h2>
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
                        {`${moment.utc(post.created_at).format("MMMM D, YYYY")} · ${post.word_count} words`}
                    </p>
                )}
            </div>
            {truncate ? (
                <div>
                    <div className="post-body p1">
                        <div className="post-preview-body" dangerouslySetInnerHTML={previewText}></div>
                    </div>
                    <a className="block read-more-link" href={post.author_relative_url}>
                        Read more...
                    </a>
                </div>
            ) : (
                <div className="post-body p1" dangerouslySetInnerHTML={renderedText}></div>
            )}
        </div>
    );
};

export default Post;
