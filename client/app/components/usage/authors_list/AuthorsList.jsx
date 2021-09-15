import PropTypes from "prop-types";
import React from "react";
import MasonryLayout from "./MasonryLayout";
import AuthorListItem from "./AuthorListItem";
import "./AuthorsList.scss";

const AuthorsList = ({ authors, type }) => {
    const getItems = (isDesktop) => authors.map((author) => (
        <AuthorListItem key={`${author.id}${isDesktop ? "-desktop" : "-mobile"}${type}`} author={author} />
    ));

    const header = type === "featured" ? "Featured authors" : "Recent authors";

    return (
        <div className="active-authors">
            <div className="active-authors__headline">
                <h3 className="h3">{header}</h3>
                <div className="headline-separator" />
            </div>
            <MasonryLayout elementId={`${type}-masonry-layout-container`}>
                {getItems(true)}
            </MasonryLayout>
            <div className="active-authors--mobile">
                {getItems(false)}
            </div>
        </div>
    );
};

AuthorsList.propTypes = {
    authors: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]).isRequired,
        }),
    ).isRequired,
    type: PropTypes.string.isRequired,
};

export default AuthorsList;
