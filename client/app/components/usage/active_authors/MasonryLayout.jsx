import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import "./MasonryLayout.scss";

const MasonryLayout = ({ children }) => {
    const MARGIN = 24;
    const THREE_COLUMN_BREAKPOINT = 1312;

    const [containerVisible, setContainerVisible] = useState(false);

    const getCols = (windowWidth) => (windowWidth < THREE_COLUMN_BREAKPOINT ? 3 : 4);

    const setupLayout = () => {
        const cols = getCols(window.innerWidth);
        const colHeights = new Array(cols).fill(0);
        const container = document.getElementById("masonry-layout-container");

        for (let i = 0; i < children.length; i += 1) {
            const colIndex = colHeights.indexOf(Math.min(...colHeights));
            const child = container.children[i];
            const childHeight = (
                child.getBoundingClientRect
                && child.getBoundingClientRect().height
            )
                ? child.getBoundingClientRect().height
                : child.offsetHeight;

            child.style.order = colIndex + 1;
            colHeights[colIndex] += childHeight + MARGIN;
        }

        for (let i = 0; i < cols - 1; i += 1) {
            const columnBreakId = `masonry-colum-break-${i}`;

            if (!document.getElementById(columnBreakId)) {
                const columnBreak = document.createElement("li");
                columnBreak.id = columnBreakId;
                columnBreak.className = "masonry-layout__column-break";
                columnBreak.style.order = i + 1;
                container.appendChild(columnBreak);
            }
        }

        container.style.height = `${Math.max(...colHeights)}px`;
        setContainerVisible(true);
    };

    useEffect(() => {
        window.addEventListener("resize", setupLayout);
        window.addEventListener("load", setupLayout);

        return () => {
            window.removeEventListener("resize", setupLayout);
            window.removeEventListener("load", setupLayout);
        };
    }, []);

    useEffect(() => {
        setTimeout(() => {
            /** tmp: correct card heights are not used on load,
             * heights are correct after small delay */
            setupLayout();
        }, 100);
    }, []);

    return (
        <ul
            id="masonry-layout-container"
            className={`masonry-layout ${containerVisible ? "masonry-layout--visible" : ""}`}
        >
            {children}
        </ul>
    );
};

MasonryLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MasonryLayout;
