import React, { useState } from "react";
import SVG from "react-inlinesvg";
import { IcChevronDown, IcChevronUp } from "../../../assets/icons";
import "./Section.scss";

const Section = ({ section }) => {
    const { id, title, collapsed, renderContent } = section;
    const content = renderContent();
    const [isCollapsed, setIsCollapsed] = useState(collapsed);

    return(
        <li className="section__container">
            <div id={id} className="card section--desktop">
                <h3 className="h3">
                    {title}
                </h3>
                <div className="section__content--visible">
                    {content}
                </div>
            </div>
            <div id={id} className="section--mobile">
                <div className="section__headline">
                    <h3 className="h3">
                        {title}
                    </h3>
                    <div className="headline-separator" />
                    <SVG
                        src={isCollapsed ? IcChevronDown : IcChevronUp}
                        className="section__collapse-icon"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    />
                </div>
                <div className={`section__content ${isCollapsed ? "" : "section__content--visible"}`}>
                    {content}
                </div>
            </div>
        </li>
        
    );
};

export default Section;
