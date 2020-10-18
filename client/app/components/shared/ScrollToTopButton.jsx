import React, { useState, useEffect } from "react";
import SVG from "react-inlinesvg";
import { IcArrowLong } from "../../assets/icons";
import "./ScrollToTopButton.scss";

const ScrollToTopButton = () => {
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth"});
    }

    const updateScrollToTop = () => {
        const scrollHeight = window.pageYOffset;
        setShowScrollToTop(scrollHeight > 500);
    };
    
    useEffect(() => {
        window.addEventListener("scroll", updateScrollToTop);
        return () => window.removeEventListener("scroll", updateScrollToTop);
    }, []);

    return(
        <button
            className={`button scroll-to-top__button ${showScrollToTop ? "scroll-to-top__button--visible" : ""}`}
            onClick={scrollToTop}
        >
            <div className="scroll-to-top__container">
                <SVG
                    src={IcArrowLong}
                    className="scroll-to-top__icon"
                />
            </div>
        </button>
    );
};

export default ScrollToTopButton;
