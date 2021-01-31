import React, { useState } from "react";
import axios from "axios";
import SVG from "react-inlinesvg";
import Post from "../posts/Post";
import ScrollToTopButton from "../shared/ScrollToTopButton";
import getAuthToken from "../../utils/getAuthToken";
import { IcChevronDown } from "../../assets/icons";
import "./Show.scss";

const Show = ({ posts, olderThan, displayAuthor }) => {
    const [visiblePosts, setVisiblePosts] = useState(posts);
    const [loadMorePostsDate, setLoadMorePostsDate] = useState(olderThan);

    const loadMorePosts = () => {
        axios
            .get(`/authors/${displayAuthor.id}/more_posts?older_than=${loadMorePostsDate}`, null, {
                headers: {
                    "X-CSRF-Token": getAuthToken(),
                },
            })
            .then((response) => {
                const { older_than: newOlderThan, posts: newPosts } = response.data;

                setVisiblePosts([...visiblePosts, ...newPosts]);
                setLoadMorePostsDate(newOlderThan);
            })
            .catch(() => {
                setLoadMorePostsDate(null);
            });
    };

    return (
        <div id="author-profile">
            <div id="author-posts">
                {visiblePosts.map((post) => (
                    <div key={post.id} className="author-post">
                        <Post post={post} />
                    </div>
                ))}
                {loadMorePostsDate && (
                    <div className="navigation">
                        <div className="older">
                            <button className="button" type="button" onClick={loadMorePosts}>
                                Load more posts
                                <SVG
                                    src={IcChevronDown}
                                    className="older__icon"
                                />
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <ScrollToTopButton />
        </div>
    );
};

export default (props) => <Show {...props} />;
