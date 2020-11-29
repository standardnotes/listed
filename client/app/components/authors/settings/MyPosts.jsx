import React from "react";
import moment from "moment";
import axios from "axios";
import SVG from "react-inlinesvg";
import Dropdown from "../../shared/Dropdown";
import getAuthToken from "../../../utils/getAuthToken";
import { IcEarth, IcEyeOff, IcMoreHorizontal, IcTrash } from "../../../assets/icons";
import "./MyPosts.scss";

const MyPosts = ({ posts, author }) => {
    const changePostPrivacy = post => {
      axios
        .post(`/authors/${author.id}/posts/${post.id}/change_privacy?secret=${author.secret}`, null, {
            headers: {
                "X-CSRF-Token": getAuthToken()
            }
        })
        .then(response => {
            window.location.href = response.request.responseURL;
        })
    };

    const deletePost = post => {
        axios
            .post(`/authors/${author.id}/posts/${post.id}/delete?secret=${author.secret}`, null, {
                headers: {
                    "X-CSRF-Token": getAuthToken()
                }
            })
            .then(response => {
                window.location.href = response.request.responseURL;
            })
    };

    const dropdownOptions = post => ([
        {
            icon: post.unlisted ? IcEarth : IcEyeOff,
            text: `Make ${post.unlisted ? "public" : "private"}`,
            action: () => changePostPrivacy(post)
        },
        {
            icon: IcTrash,
            text: "Delete",
            action: () => deletePost(post)
        }
    ]);


    return (
        <ul className="my-posts">
            {posts.length == 0 && (
                <p>No posts yet.</p>
            )}
            {posts.map(post => (
                <li key={post.id} className="my-posts__item">
                    <a href={post.url} target="_blank" rel="noopener noreferrer" className="my-posts__post">
                        <h5 className="h5">
                            {post.title}
                        </h5>
                        <p className="p3 post__details">
                            {post.unlisted ? (
                                <span className="post-details__item">
                                    <SVG src={IcEyeOff} className="post-details__icon" />
                                    Private
                                </span>
                            ) : (
                                <span className="post-details__item">
                                    <SVG src={IcEarth} className="post-details__icon" />
                                    Public
                                </span>
                            )}
                            <span className="post-details__item">
                                {moment(post.created_at).format("MMMM D, YYYY")}
                            </span>
                            <span className="post-details__item">
                                {post.word_count.toLocaleString()} words
                            </span>
                        </p>
                    </a>
                    <div className="my-posts__hover-container">
                        <Dropdown options={dropdownOptions(post)}>
                            <div className="hover-icon__container">
                                <SVG src={IcMoreHorizontal} className="hover-icon" />
                            </div>
                        </Dropdown>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default MyPosts;
