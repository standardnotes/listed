import React from "react";
import "./GifSection.scss";

const GifSection = ({ text, gifSource}) => {
    return(
        <div className="gif-section__container">
            <p className="p2">{text}</p>
            <img src={gifSource} className="new-author__gif" />
        </div>
    );
};

export default GifSection;
