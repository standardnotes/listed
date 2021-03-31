/* eslint-disable camelcase */
import React, { useState } from "react";
import "./Appearance.scss";
import PropTypes from "prop-types";
import axios from "axios";
import Checkbox from "../../shared/Checkbox";
import getAuthToken from "../../../utils/getAuthToken";
import RadioButtonGroup from "../../shared/RadioButtonGroup";
import {
    CardedBlogImage,
    CondensedCoverImage,
    FullCoverImage,
    VerticalBlogImage,
} from "../../../assets/images";

const optionType = {
    coverStyle: "coverStyle",
    blogLayoutStyle: "blogLayoutStyle",
};

const validOptions = {
    [optionType.coverStyle]: [
        "full",
        "condensed",
    ],
    [optionType.blogLayoutStyle]: [
        "vertical",
        "cards",
    ],
};

const optionData = {
    [optionType.coverStyle]: {
        full: {
            label: "Default",
            image: {
                src: FullCoverImage,
                alt: "Cover takes up all the space",
            },
        },
        condensed: {
            label: "Condensed",
            image: {
                src: CondensedCoverImage,
                alt: "Cover takes up 50% of the space",
            },
        },
    },
    [optionType.blogLayoutStyle]: {
        vertical: {
            label: "Default",
            image: {
                src: VerticalBlogImage,
                alt: "Blog posts are shown in a vertical layout",
            },
        },
        cards: {
            label: "Cards",
            image: {
                src: CardedBlogImage,
                alt: "Blog posts are shown in cards layout",
            },
        },
    },
};

const Appearance = ({ author, setErrorToastMessage, setIsErrorToastDisplayed }) => {
    const {
        cover_style,
        blog_layout_style,
        custom_theme_enabled,
    } = author;

    const [editedAuthor, setEditedAuthor] = useState({
        cover_style,
        blog_layout_style,
        custom_theme_enabled,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsErrorToastDisplayed(false);

        try {
            const response = await axios
                .put(`/authors/${author.id}/appearance?secret=${author.secret}`, null, {
                    headers: {
                        "X-CSRF-Token": getAuthToken(),
                    },
                    data: {
                        author: editedAuthor,
                    },
                });

            Turbolinks.visit(response.request.responseURL);
        } catch (_) {
            setErrorToastMessage("There was an error trying to update your settings. Please try again.");
            setIsErrorToastDisplayed(true);
        }
    };

    const handleAuthorChange = (key, value) => {
        setEditedAuthor((prevState) => (
            { ...prevState, [key]: value }
        ));
    };

    const getOptions = (type) => validOptions[type].map((option) => ({
        id: option,
        value: option,
        ...optionData[type][option],
    }));

    return (
        <form onSubmit={handleSubmit}>
            <RadioButtonGroup
                id="author-cover-style"
                onChange={handleAuthorChange}
                selected={editedAuthor.cover_style}
                text="Cover Style"
                name="cover_style"
                options={getOptions(optionType.coverStyle)}
            />
            <RadioButtonGroup
                id="author-blog-layout-style"
                onChange={handleAuthorChange}
                selected={editedAuthor.blog_layout_style}
                text="Blog Layout Style"
                name="blog_layout_style"
                options={getOptions(optionType.blogLayoutStyle)}
            />
            <Checkbox
                id="author-custom-theme-enabled"
                onClick={(checked) => handleAuthorChange("custom_theme_enabled", checked)}
                checked={editedAuthor.custom_theme_enabled}
                label="Enable custom CSS"
            />
            <div className="form-section form-row">
                <button
                    type="submit"
                    className="button button--primary"
                >
                    Save changes
                </button>
            </div>
        </form>
    );
};

Appearance.propTypes = {
    author: PropTypes.shape({
        id: PropTypes.number.isRequired,
        secret: PropTypes.string.isRequired,
        cover_style: PropTypes.oneOf(validOptions.coverStyle).isRequired,
        blog_layout_style: PropTypes.oneOf(validOptions.blogLayoutStyle).isRequired,
        custom_theme_enabled: PropTypes.bool.isRequired,
    }).isRequired,
    setErrorToastMessage: PropTypes.func.isRequired,
    setIsErrorToastDisplayed: PropTypes.func.isRequired,
};

export default (props) => <Appearance {...props} />;
