import PropTypes from "prop-types";
import React from "react";
import "./GifSection.scss";

const GifSection = ({ text, gifSource }) => (
    <div className="gif-section__container">
        <p className="p2">{text}</p>
        <img src={gifSource} className="new-author__gif" alt="" />
    </div>
);

GifSection.propTypes = {
    gifSource: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

export default GifSection;
