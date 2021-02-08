import PropTypes from "prop-types";
import React from "react";
import MasonryLayout from "./MasonryLayout";
import ActiveAuthorItem from "./ActiveAuthorItem";
import "./ActiveAuthors.scss";

const ActiveAuthors = ({ activeAuthors }) => {
    const getItems = (isDesktop) => activeAuthors.map((author) => (
        <ActiveAuthorItem key={`${author.id}${isDesktop ? "-desktop" : "-mobile"}`} author={author} />
    ));

    return (
        <div className="active-authors">
            <div className="active-authors__headline">
                <h3 className="h3">Listed authors</h3>
                <div className="headline-separator" />
            </div>
            <MasonryLayout>
                {getItems(true)}
            </MasonryLayout>
            <div className="active-authors--mobile">
                {getItems(false)}
            </div>
        </div>
    );
};

ActiveAuthors.propTypes = {
    activeAuthors: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]).isRequired,
        }),
    ).isRequired,
};

export default ActiveAuthors;
