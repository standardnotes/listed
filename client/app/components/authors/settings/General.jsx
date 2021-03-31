/* eslint-disable camelcase */
import PropTypes from "prop-types";
import React, { useState } from "react";
import axios from "axios";
import getAuthToken from "../../../utils/getAuthToken";
import Checkbox from "../../shared/Checkbox";
import authorType from "../../../types/author";
import "./General.scss";

const General = ({ author, setErrorToastMessage, setIsErrorToastDisplayed }) => {
    const {
        username,
        display_name,
        bio,
        link,
        twitter,
        email,
        meta_image_url,
        header_image_url,
        guestbook_disabled,
        newsletter_disabled,
        hide_from_homepage,
    } = author;

    const [editedAuthor, setEditedAuthor] = useState({
        username: username || "",
        display_name: display_name || "",
        bio: bio || "",
        link: link || "",
        twitter: twitter || "",
        email: email || "",
        meta_image_url: meta_image_url || "",
        header_image_url: header_image_url || "",
        guestbook_disabled,
        newsletter_disabled,
        hide_from_homepage,
    });

    const [usernameErrorMessage, setUsernameErrorMessage] = useState(null);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

    const submitEditedAuthor = async (event) => {
        event.preventDefault();
        setIsSubmitDisabled(true);
        setIsErrorToastDisplayed(false);

        try {
            const response = await axios
                .put(`/authors/${author.id}?secret=${author.secret}`, null, {
                    headers: {
                        "X-CSRF-Token": getAuthToken(),
                    },
                    data: {
                        author: {
                            ...author,
                            ...editedAuthor,
                        },
                    },
                });

            setUsernameErrorMessage(null);
            Turbolinks.visit(response.request.responseURL);
        } catch (err) {
            setIsSubmitDisabled(false);

            if (err.response.status === 409) {
                setUsernameErrorMessage(err.response.data.message);
            } else {
                setErrorToastMessage("There was an error trying to update your settings. Please try again.");
                setIsErrorToastDisplayed(true);
            }
        }
    };

    const editAuthor = (key, value) => (
        setEditedAuthor((prevState) => (
            { ...prevState, [key]: value }
        ))
    );

    return (
        <form onSubmit={(e) => submitEditedAuthor(e)}>
            <div className="form-row">
                <div className="form-section">
                    <label htmlFor="author-username" className="label p2">
                        Username
                    </label>
                    <input
                        id="author-username"
                        className={`text-field ${usernameErrorMessage ? "text-field--error" : ""}`}
                        value={editedAuthor.username}
                        onChange={(e) => editAuthor("username", e.target.value)}
                    />
                    {usernameErrorMessage && (
                        <div className="error-message">
                            {usernameErrorMessage}
                        </div>
                    )}
                </div>
                <div className="form-section">
                    <label htmlFor="author-display-name" className="label p2">
                        Display name
                    </label>
                    <input
                        id="author-display-name"
                        className="text-field"
                        value={editedAuthor.display_name}
                        onChange={(e) => editAuthor("display_name", e.target.value)}
                    />
                </div>
            </div>
            <div className="form-section">
                <label htmlFor="author-bio" className="label p2">
                    Bio
                </label>
                <textarea
                    id="author-bio"
                    className="text-field"
                    value={editedAuthor.bio}
                    onChange={(e) => editAuthor("bio", e.target.value)}
                    rows="4"
                />
            </div>
            <div className="form-section--row">
                <div className="form-section">
                    <label htmlFor="author-link" className="label p2">
                        Link
                    </label>
                    <input
                        id="author-link"
                        className="text-field"
                        value={editedAuthor.link}
                        onChange={(e) => editAuthor("link", e.target.value)}
                    />
                </div>
                <div className="form-section">
                    <label htmlFor="author-twitter" className="label p2">
                        Twitter username
                    </label>
                    <input
                        id="author-twitter"
                        className="text-field"
                        value={editedAuthor.twitter}
                        onChange={(e) => editAuthor("twitter", e.target.value)}
                    />
                </div>
            </div>
            <div className="form-section">
                <label htmlFor="author-email" className="label p2">
                    Email
                </label>
                <p className="p3 sublabel">
                    Allows subscribers to reply to your posts,
                    as well as notifies you when someone subscribes to your blog.
                    <input
                        id="author-email"
                        className="text-field"
                        placeholder="Enter your email"
                        value={editedAuthor.email}
                        onChange={(e) => editAuthor("email", e.target.value)}
                    />
                </p>
            </div>
            <div className="form-row">
                <div className="form-section">
                    <label htmlFor="author-meta-image-url" className="label p2">
                        Meta image URL
                    </label>
                    <p className="sublabel p3">
                        The image that will be used when generating
                        link previews in Twitter, Slack, Facebook, etc.
                    </p>
                    <input
                        id="author-meta-image-url"
                        className="text-field"
                        placeholder="Meta image URL"
                        value={editedAuthor.meta_image_url}
                        onChange={(e) => editAuthor("meta_image_url", e.target.value)}
                    />
                </div>
                <div className="form-section">
                    <label htmlFor="author-header-image-url" className="label p2">
                        Header image URL
                    </label>
                    <p className="sublabel p3 sublabel--header-image">
                        The image that will be displayed
                        on top of your blog page (below the description).
                    </p>
                    <input
                        id="author-header-image_url"
                        className="text-field"
                        placeholder="Header image URL"
                        value={editedAuthor.header_image_url}
                        onChange={(e) => editAuthor("header_image_url", e.target.value)}
                    />
                </div>
            </div>
            <Checkbox
                id="author-guestbook-disabled"
                onClick={(checked) => editAuthor("guestbook_disabled", checked)}
                checked={editedAuthor.guestbook_disabled}
                label="Disable guestbook"
            />
            <Checkbox
                id="author-newsletter-disabled"
                onClick={(checked) => editAuthor("newsletter_disabled", checked)}
                checked={editedAuthor.newsletter_disabled}
                label="Disable email subscription and newsletter"
            />
            <Checkbox
                id="author-hide-from-homepage"
                onClick={(checked) => editAuthor("hide_from_homepage", checked)}
                checked={editedAuthor.hide_from_homepage}
                label="Hide profile from the “Listed authors” section in the homepage"
            />
            <div className="form-section form-row">
                <button
                    type="submit"
                    className={`button ${isSubmitDisabled ? "button--disabled" : "button--primary"}`}
                    disabled={isSubmitDisabled}
                >
                    Save changes
                </button>
            </div>
        </form>
    );
};

General.propTypes = {
    author: authorType.isRequired,
    setErrorToastMessage: PropTypes.func.isRequired,
    setIsErrorToastDisplayed: PropTypes.func.isRequired,
};

export default (props) => <General {...props} />;
