import React from "react";
import moment from "moment";
import axios from "axios";

export default ({ posts, author }) => {
    const deletePost = post => {
        axios
            .get(`/authors/${author.id}/posts/${post.id}/delete?secret=${author.secret}`)
            .then(response => {
                window.location.href = response.request.responseURL;
            })
    };

    return (
        <div>
            <h3>All Posts</h3>
            <div className="guestbook sk-panel static">
                {posts.length == 0 && (
                    <p>No posts yet.</p>
                )}
                {posts.map(post => (
                    <div key={post.id} className="sk-notification contrast">
                        <p className="sk-p">
                            <strong>
                                <a href={post.url} target="_blank" rel="noopener noreferrer">{post.title}</a>
                            </strong>
                        </p>
                        <p className="sk-p">
                            <strong>
                                {post.unlisted ? "Private" : "Public"}
                            </strong>
                        </p>
                        <i className="sk-p">
                            {moment(post.created_at).format("MMMM D, YYYY")}
                        </i>
                        <div className="sk-horizontal-group">
                            <p className="sk-p">
                                <a href="#" onClick={e => deletePost(post)}>Delete</a>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
