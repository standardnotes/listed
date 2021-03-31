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
        <div className="form-section">
            <p className="label p2">{text}</p>
            <div className="form-section radio-button-group__options-container">
                {options.map((option) => (
                    <RadioButton
                        name={name}
                        onChange={handleChange}
                        key={option.id}
                        selected={selected === option.value}
                        {...option}
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
            image: PropTypes.shape({
                src: PropTypes.node.isRequired,
                alt: PropTypes.string.isRequired,
            }).isRequired,
        }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    selected: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default RadioButtonGroup;
