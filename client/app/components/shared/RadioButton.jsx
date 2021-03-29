import PropTypes from "prop-types";
import React from "react";
import SVG from "react-inlinesvg";
import { IcRadioButtonEmpty, IcRadioButtonSelected } from "../../assets/icons";
import "./RadioButton.scss";

const RadioButton = ({
    id, onChange, selected, label, name, value,
}) => {
    const handleChange = (event) => {
        onChange(event.target.value);
    };
    const handleSVGClick = () => {
        onChange(value);
    };

    return (
        <div className="form-section radio_button__container">
            <div style={{ height: "100%" /* todo: this is a placeholder until we can use the images */}}>
                image
            </div>
            <div className="radio_button__input-container">
                <input
                    id={id}
                    type="radio"
                    className="radio_button"
                    checked={selected}
                    onChange={handleChange}
                    name={name}
                    value={value}
                />
                <div className="radio_button__icon-container">
                    <SVG
                        src={selected ? IcRadioButtonSelected : IcRadioButtonEmpty}
                        onClick={handleSVGClick}
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
};

export default RadioButton;
