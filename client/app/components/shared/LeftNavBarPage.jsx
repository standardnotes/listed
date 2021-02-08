import PropTypes from "prop-types";
import React from "react";
import { NavBar, Section } from "./left_nav_bar_page";
import "./LeftNavBarPage.scss";

const LeftNavBarPage = ({ heading, subheading, sections }) => (
    <div className="page-container">
        <div className="left-nav-bar-page__header">
            <h1 className="h1">
                {heading}
            </h1>
            {subheading}
        </div>
        <div className="left-nav-bar-page__content">
            <NavBar sections={sections} />
            <ul className="left-nav-bar-page__sections">
                {sections.map((section) => <Section key={section.id} section={section} />)}
            </ul>
        </div>
    </div>
);

LeftNavBarPage.propTypes = {
    heading: PropTypes.string.isRequired,
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
        }),
    ).isRequired,
    subheading: PropTypes.node.isRequired,
};

export default LeftNavBarPage;
