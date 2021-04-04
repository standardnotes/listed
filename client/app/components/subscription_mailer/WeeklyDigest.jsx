import PropTypes from "prop-types";
import React from "react";
import dayjs from "dayjs";

const WeeklyDigest = ({ author, posts, unsubscribeUrl }) => {
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
                        <i>{dayjs(post.created_at).format("MMMM D, YYYY")}</i>
                        {/* eslint-disable-next-line react/no-danger */}
                        <p dangerouslySetInnerHTML={renderedText(post)} />
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
            <div style={{ height: "12px" }} />
        </div>
    );
};

WeeklyDigest.propTypes = {
    author: PropTypes.shape({
        email: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            author_relative_url: PropTypes.string.isRequired,
            created_at: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
        }),
    ).isRequired,
    unsubscribeUrl: PropTypes.string.isRequired,
};

export default WeeklyDigest;
