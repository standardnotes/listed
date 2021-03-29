import PropTypes from "prop-types";
import React from "react";
import RadioButton from "./RadioButton";
import "./RadioButtonGroup.scss";

const RadioButtonGroup = ({
    options, onChange, name, selected, text,
}) => {
    const handleChange = (value) => {
        onChange(name, value);
    };
    return (
        <div className="form-section radio_button_group__container">
            <p>{text}</p>
            <div className="form-section radio_button_group__options-container">
                {options.map((option) => (
                    <RadioButton
                        name={name}
                        onChange={handleChange}
                        id={option.id}
                        key={option.id}
                        label={option.label}
                        value={option.value}
                        selected={selected === option.value}
                    />
                ))}
            </div>
        </div>
    );
};

RadioButtonGroup.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    selected: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default RadioButtonGroup;
