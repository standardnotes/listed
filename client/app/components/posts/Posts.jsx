import React from "react";

export default ({ days }) => {
    return (
        <div id="posts-container">
            <div className="days">
                {days.map(day => (
                    <div key={day.day}>
                        <h3 style={ { fontWeight: "normal" }}>{day.day}</h3>
                        <div className="posts-links mt-10">
                            {day.posts.map(post => (
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
};
