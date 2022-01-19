import PropTypes from "prop-types";
import React from "react";
import Post from "../posts/Post";
import ScrollToTopButton from "../shared/ScrollToTopButton";
import "./All.scss";

const All = ({ posts }) => (
    <div id="author-all">
        <div id="author-posts">
            {posts.map((post) => (
                <div key={post.id} className="author-post">
                    <Post post={post} truncate />
                </div>
            ))}
        </div>
        <ScrollToTopButton />
    </div>
);

All.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
        }),
    ).isRequired,
};

export default (props) => <All {...props} />;
