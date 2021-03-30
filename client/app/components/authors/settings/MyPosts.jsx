import PropTypes from "prop-types";
import React, { useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import SVG from "react-inlinesvg";
import ConfirmationModal from "./ConfirmationModal";
import Dropdown from "../../shared/Dropdown";
import getAuthToken from "../../../utils/getAuthToken";
import {
    IcEarth, IcEyeOff, IcMoreHorizontal, IcTrash,
} from "../../../assets/icons";
import "./MyPosts.scss";

const MyPosts = ({
    posts, author, setErrorToastMessage, setIsErrorToastDisplayed,
}) => {
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [confirmationModalDisplayed, setConfirmationModalDisplayed] = useState(null);

    const changePostPrivacy = async (post) => {
        setIsErrorToastDisplayed(false);

        try {
            const response = await axios
                .post(`/authors/${author.id}/posts/${post.id}/change_privacy?secret=${author.secret}`, null, {
                    headers: {
                        "X-CSRF-Token": getAuthToken(),
                    },
                });

            Turbolinks.visit(response.request.responseURL);
        } catch (err) {
            setErrorToastMessage("There was an error trying to change the post's privacy. Please try again.");
            setIsErrorToastDisplayed(true);
        }
    };

    const deletePost = async (post) => {
        setIsErrorToastDisplayed(false);
        setConfirmationModalDisplayed(null);

        try {
            const response = await axios
                .post(`/authors/${author.id}/posts/${post.id}/delete?secret=${author.secret}`, null, {
                    headers: {
                        "X-CSRF-Token": getAuthToken(),
                    },
                });

            Turbolinks.visit(response.request.responseURL);
        } catch (err) {
            setErrorToastMessage("There was an error trying to delete the post. Please try again.");
            setIsErrorToastDisplayed(true);
        }
    };

    const dropdownOptions = (post) => ([
        {
            icon: post.unlisted ? IcEarth : IcEyeOff,
            text: `Make ${post.unlisted ? "public" : "private"}`,
            action: () => changePostPrivacy(post),
        },
        {
            icon: IcTrash,
            text: "Delete",
            action: () => setConfirmationModalDisplayed(post.id),
        },
    ]);

    return (
        <ul className="my-posts">
            {posts.length === 0 && (
                <p>No posts yet.</p>
            )}
            {posts.map((post) => (
                <li key={post.id} className="my-posts__item hover-container">
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
                                {dayjs(post.created_at).format("MMMM D, YYYY")}
                            </span>
                            <span className="post-details__item">
                                {post.word_count.toLocaleString()}
                                {" "}
                                words
                            </span>
                        </p>
                    </a>
                    <div className="hover-content">
                        <Dropdown
                            options={dropdownOptions(post)}
                            isOpen={!!dropdownOpen && dropdownOpen === post.id}
                            onClick={() => setDropdownOpen(post.id)}
                        >
                            <div className="hover-content__icon-container">
                                <SVG src={IcMoreHorizontal} className="hover-content__icon" />
                            </div>
                        </Dropdown>
                    </div>
                    {confirmationModalDisplayed && confirmationModalDisplayed === post.id && (
                        <ConfirmationModal
                            text="Are you sure you want to delete this post?"
                            primaryOption={{
                                text: "Cancel",
                                onClick: () => setConfirmationModalDisplayed(null),
                            }}
                            secondaryOption={{
                                text: "Delete",
                                onClick: () => deletePost(post),
                            }}
                        />
                    )}
                </li>
            ))}
        </ul>
    );
};

MyPosts.propTypes = {
    author: PropTypes.shape({
        id: PropTypes.number.isRequired,
        secret: PropTypes.string.isRequired,
    }).isRequired,
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            created_at: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            unlisted: PropTypes.bool.isRequired,
            url: PropTypes.string.isRequired,
            word_count: PropTypes.number.isRequired,
        }),
    ).isRequired,
    setErrorToastMessage: PropTypes.func.isRequired,
    setIsErrorToastDisplayed: PropTypes.func.isRequired,
};

export default MyPosts;
