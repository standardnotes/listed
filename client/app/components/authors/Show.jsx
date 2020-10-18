import React, { useState, useEffect } from "react";
import axios from "axios";
import SVG from "react-inlinesvg";
import Post from "../posts/Post";
import getAuthToken from "../../utils/getAuthToken";
import { IcChevronDown, IcArrowLong } from "../../assets/icons";
import "./Show.scss";

const Show = ({ posts, olderThan, displayAuthor }) => {
    const [visiblePosts, setVisiblePosts] = useState(posts);
    const [loadMorePostsDate, setLoadMorePostsDate] = useState(olderThan);
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    const loadMorePosts = () => {
        axios
            .get(`/authors/${displayAuthor.id}/more_posts?older_than=${loadMorePostsDate}`, null, {
                headers: {
                    "X-CSRF-Token": getAuthToken()
                },
            })
            .then(response => {
                const { older_than, posts } = response.data;

                setVisiblePosts([...visiblePosts, ...posts]);
                setLoadMorePostsDate(older_than);
            })
            .catch(error => {
                setLoadMorePostsDate(null);
            })
    };

    const updateScrollToTop = () => {
        const scrollHeight = window.pageYOffset;
        setShowScrollToTop(scrollHeight > 500);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth"});
    }
    
    useEffect(() => {
        window.addEventListener("scroll", updateScrollToTop);
        return () => window.removeEventListener("scroll", updateScrollToTop);
    }, []);

    return (
        <div id="author-profile">
            <div id="author-posts">
                {visiblePosts.map(post => (
                    <div key={post.id} className="author-post single-post-show">
                        <Post post={post}></Post>
                    </div>
                ))}
                {loadMorePostsDate && (
                    <div className="navigation">
                    <div className="older">
                            <button className="button" onClick={loadMorePosts}>
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
            <button
                className={`button scroll-to-top__button ${showScrollToTop ? "scroll-to-top__button--visible" : ""}`}
                onClick={scrollToTop}
            >
                <div className="scroll-to-top__container">
                    <SVG
                        src={IcArrowLong}
                        className="scroll-to-top__icon"
                    />
                </div>
            </button>
        </div>
    );
};

export default props => <Show {...props} />;
