import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import axios from "axios";
import getAuthToken from "../../../utils/getAuthToken";
import Checkbox from "../../shared/Checkbox";
import "./DeleteBlog.scss";

const DeleteBlog = ({ author }) => {
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [isDeleteBlogChecked, setIsDeleteBlogChecked] = useState(false);
    const [isDeletePostsChecked, setIsDeletePostsChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const submitDeleteAllData = async (event) => {
        event.preventDefault();
        setIsSubmitDisabled(true);

        try {
            const response = await axios
                .post(`/authors/${author.id}/delete_all_data`, null, {
                    headers: {
                        "X-CSRF-Token": getAuthToken(),
                    },
                    data: {
                        secret: author.secret,
                    },
                });

            setErrorMessage(null);
            Turbolinks.visit(response.request.responseURL);
        } catch (err) {
            setErrorMessage(err.response.data.error);
            setIsSubmitDisabled(false);
        }
    };

    useEffect(() => {
        setIsSubmitDisabled(!isDeleteBlogChecked || !isDeletePostsChecked);
    }, [isDeleteBlogChecked, isDeletePostsChecked]);

    return (
        <div className="delete-blog">
            <p className="p2 delete-blog__info">
                Delete your Listed blog and all accompanying data including all your posts.
            </p>
            <p className="p2 delete-blog__info">
                Note that this will not affect any of the source notes
                in your Standard Notes account.
            </p>
            <p className="p2 delete-blog__instructions">
                Please confirm that you understand the ramifications of your actions:
            </p>
            <form onSubmit={(e) => submitDeleteAllData(e)} className="delete-blog__form">
                <Checkbox
                    id="listed-blog-deleted"
                    onClick={setIsDeleteBlogChecked}
                    checked={isDeleteBlogChecked}
                    label="My Listed blog will be deleted"
                />
                <Checkbox
                    id="posts-deleted"
                    onClick={setIsDeletePostsChecked}
                    checked={isDeletePostsChecked}
                    label="All my posts will be deleted"
                />
                <div className="form-section delete-blog__button-container">
                    <button
                        type="submit"
                        className={`button ${isSubmitDisabled ? "button--disabled" : "button--primary"} delete-blog__button`}
                        disabled={isSubmitDisabled}
                    >
                        Delete my blog
                    </button>
                </div>
            </form>
            {errorMessage && (
                <div className="error-message">
                    {errorMessage}
                </div>
            )}
        </div>
    );
};

DeleteBlog.propTypes = {
    author: PropTypes.shape({
        id: PropTypes.number.isRequired,
        secret: PropTypes.string.isRequired,
    }).isRequired,
};

export default DeleteBlog;
