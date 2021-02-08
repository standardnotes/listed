import PropTypes from "prop-types";
import React from "react";

const Posts = ({ days }) => (
    <div id="posts-container">
        <div className="days">
            {days.map((day) => (
                <div key={day.day}>
                    <h3 style={{ fontWeight: "normal" }}>{day.day}</h3>
                    <div className="posts-links mt-10">
                        {day.posts.map((post) => (
                            <div key={post.id} className="link">
                                <a className="block" href={post.tokenized_url}>{post.title}</a>
                            </div>
                        ))}
                    </div>
                </div>

            ))}
        </div>
    </div>
);

Posts.propTypes = {
    days: PropTypes.arrayOf(
        PropTypes.shape({
            day: PropTypes.string.isRequired,
            posts: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    title: PropTypes.string.isRequired,
                    tokenized_url: PropTypes.string.isRequired,
                }),
            ).isRequired,
        }),
    ).isRequired,
};

export default Posts;
