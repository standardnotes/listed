import React from "react";
import Post from "../posts/Post";

export default ({ posts, olderThan, newerThan, displayAuthorUrl }) => {
    return (
        <div id="author-profile">
            <div id="author-posts">
                {posts.map(post => (
                    <div key={post.id} className="author-post single-post-show">
                        <Post post={post}></Post>
                    </div>
                ))}
                <div className="navigation">
                    {olderThan && (
                        <div className="older">
                            <a href={`${displayAuthorUrl}?b=${olderThan}`}> ← Older</a>
                        </div>
                    )}
                    {newerThan && (
                        <div className="newer">
                            <a href={`${displayAuthorUrl}?a=${newerThan}`}> Newer →</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
