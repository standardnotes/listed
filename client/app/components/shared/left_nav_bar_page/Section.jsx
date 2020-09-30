import React, { useState, useEffect } from "react";
import SVG from "react-inlinesvg";
import { IcChevronDown, IcChevronUp } from "../../../assets/icons";
import "./Section.scss";

const Section = ({ section }) => {
    const { id, title, collapsed, renderContent } = section;
    const content = renderContent();
    const [isCollapsed, setIsCollapsed] = useState(collapsed);

    useEffect(() => {
        const sectionContentElement = document.querySelector(`#${section.id} .section__content`);

        if (isCollapsed) {
            sectionContentElement.style.height = "0px";
            sectionContentElement.style.visibility = "hidden";
        } else {
            const sectionHeight = sectionContentElement.scrollHeight;
            sectionContentElement.style.height = `${sectionHeight}px`;
            sectionContentElement.style.visibility = "visible";
        }
    }, [isCollapsed]);

    return(
        <li className="section__container">
            <div id={id} className="card section--desktop">
                <h3 className="h3">
                    {title}
                </h3>
                <div>
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
                <div className="section__content">
                    {content}
                </div>
            </div>
        </li>
        
    );
};

export default Section;
