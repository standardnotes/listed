import React, { useState, useEffect } from "react";
import "./MasonryLayout.scss";

const MasonryLayout = ({ children }) => {
    const margin = 24;
    const [containerVisible, setContainerVisible] = useState(false);

    const getCols = windowWidth => {
        return (windowWidth < 1312) ? 3 : 4;
    }

    const setupLayout = () => {
        const cols = getCols(window.innerWidth);
        const colHeights = new Array(cols).fill(0);
        const colItems = new Array(cols).fill(0);
        const container = document.getElementById("masonry-layout-container");
        
        for (let i = 0; i < children.length; i++) {
            const colIndex = colHeights.indexOf(Math.min(...colHeights));
            const child = container.children[i];
        
            child.style.order = colIndex + 1;;
            colHeights[colIndex] += child.offsetHeight;
            colItems[colIndex]++;
        };


        for (let i = 0; i < cols - 1; i++) {
            const columnBreakId = `masonry-colum-break-${i}`;

            if (!document.getElementById(columnBreakId)) {
                const columnBreak = document.createElement("div");
                columnBreak.id = columnBreakId;
                columnBreak.className = "masonry-layout__column-break";
                columnBreak.style.order = i + 1;
                container.appendChild(columnBreak);
            }
        }

        const maxHeight = Math.max(...colHeights);
        const containerHeight = maxHeight + colItems[colHeights.indexOf(maxHeight)] * margin;

        container.style.height = `${containerHeight}px`;
        setContainerVisible(true);
    }

    useEffect(() => {
        setupLayout();
        window.addEventListener("resize", setupLayout);
        return () => window.removeEventListener("resize", setupLayout);
    }, []);

    useEffect(() => {
        setupLayout();
    }, [children]);

    return(
        <div id="masonry-layout-container" className={`masonry-layout ${containerVisible ? "masonry-layout--visible" : ""}`}>
            {children}
        </div>
    );
};

export default MasonryLayout;
