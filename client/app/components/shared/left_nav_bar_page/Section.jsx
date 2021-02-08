import PropTypes from "prop-types";
import React, { useState, useEffect, useRef } from "react";
import SVG from "react-inlinesvg";
import { IcChevronDown, IcChevronUp } from "../../../assets/icons";
import "./Section.scss";

const Section = ({ section }) => {
    const {
        id, title, collapsed, renderContent,
    } = section;
    const content = renderContent();
    const [isCollapsed, setIsCollapsed] = useState(collapsed);
    const isCollapsedRef = useRef(isCollapsed);

    const updateIsCollapsed = (collapsedState) => {
        setIsCollapsed(collapsedState);
        isCollapsedRef.current = collapsedState;
    };

    const setSectionStyle = () => {
        const sectionContentElement = document.querySelector(`#${section.id} .section__content`);

        if (isCollapsedRef.current) {
            sectionContentElement.style.maxHeight = "0px";
            sectionContentElement.style.visibility = "hidden";
            sectionContentElement.style.overflow = "hidden";
        } else {
            const sectionHeight = sectionContentElement.scrollHeight;

            if (sectionHeight) {
                sectionContentElement.style.maxHeight = `${sectionHeight + 250}px`;
                sectionContentElement.style.visibility = "visible";
                sectionContentElement.style.overflow = "visible";
            }
        }
    };

    useEffect(setSectionStyle, [isCollapsed]);

    useEffect(() => {
        window.addEventListener("resize", setSectionStyle);
        return () => window.removeEventListener("resize", setSectionStyle);
    }, []);

    return (
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
                        onClick={() => updateIsCollapsed(!isCollapsed)}
                    />
                </div>
                <div className="section__content">
                    {content}
                </div>
            </div>
        </li>

    );
};

Section.propTypes = {
    section: PropTypes.shape({
        collapsed: PropTypes.bool.isRequired,
        id: PropTypes.string.isRequired,
        renderContent: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
};

export default Section;
