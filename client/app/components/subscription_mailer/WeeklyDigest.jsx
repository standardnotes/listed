import React from "react";
import moment from "moment";

export default ({ author, posts, unsubscribeUrl }) => {
    const renderedText = (post) => ({ __html: post.rendered_text });

    return (
        <div>
            <p>
                {author.title}
                {" "}
                published some new posts this week:
            </p>
            {posts.map((post) => (
                <div key={post.id}>
                    <h3>
                        <a className="unstyled" href={post.author_relative_url}>
                            {post.title}
                        </a>
                    </h3>
                    <div className="post-content">
                        <i>{moment.utc(post.created_at).format("MMMM D, YYYY")}</i>
                        {/* eslint-disable-next-line react/no-danger */}
                        <div className="post-body" dangerouslySetInnerHTML={renderedText(post)} />
                    </div>
                </div>
            ))}
            <hr />
            <div className="post-footer">
                {author.email && author.email.length > 0 && (
                    <p>
                        <i>
                            You can reply to the author by replying directly to this email.
                        </i>
                    </p>
                )}
            </div>
            <div className="links-footer" style={{ marginBottom: "20px" }}>
                <a href={unsubscribeUrl}>Unsubscribe</a>
            </div>
            <div className="bottom-margin-space" />
        </div>
    );
};
