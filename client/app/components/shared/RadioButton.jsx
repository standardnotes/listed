import PropTypes from "prop-types";
import React from "react";
import SVG from "react-inlinesvg";
import { IcRadioButtonEmpty, IcRadioButtonSelected } from "../../assets/icons";
import "./RadioButton.scss";

const RadioButton = ({
    id, onChange, selected, label, name, value, image,
}) => {
    const ENTER_KEY = 13;
    const SPACE_KEY = 32;

    const handleChange = (event) => {
        onChange(event.target.value);
    };

    const handleClick = () => {
        onChange(value);
    };

    const handleKeyDown = (event) => {
        if (event.keyCode === ENTER_KEY || event.keyCode === SPACE_KEY) {
            event.preventDefault();
            onChange(value);
        }
    };

    return (
        <div
            className="form-section radio-button__container"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="radio"
            aria-checked={selected}
            tabIndex={0}
        >
            <div className="radio-button__image-container">
                <img
                    src={image.src}
                    alt={image.alt}
                />
            </div>
            <div className="radio-button__input-container">
                <input
                    id={id}
                    type="radio"
                    className="radio-button"
                    checked={selected}
                    onChange={handleChange}
                    name={name}
                    value={value}
                />
                <div className="radio-button__icon-container">
                    <SVG
                        src={selected ? IcRadioButtonSelected : IcRadioButtonEmpty}
                    />
                </div>
                <label htmlFor={id} className="p2">
                    {label}
                </label>
            </div>
        </div>
    );
};

RadioButton.propTypes = {
    selected: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.shape({
        src: PropTypes.node.isRequired,
        alt: PropTypes.string.isRequired,
    }).isRequired,
};

export default RadioButton;
