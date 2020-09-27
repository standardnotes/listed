import React from "react";
import { NavBar, Section } from "./left_nav_bar_page";
import "./LeftNavBarPage.scss";

const LeftNavBarPage = ({ heading, subheading, sections }) => {
    return(
        <div className="page-container">
            <div className="left-nav-bar-page__header">
                <h1 className="h1">
                    {heading}
                </h1>
                <p className="p1">
                    {subheading}
                </p>
            </div>
            <div className="left-nav-bar-page__content">
                <NavBar sections={sections} />
                <ul className="left-nav-bar-page__sections">
                    {sections.map(section =>
                        <Section key={section.id} section={section} />
                    )}
                </ul>
            </div>
        </div>
    );
};

export default LeftNavBarPage;
