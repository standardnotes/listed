import React, { useState, useEffect } from "react";
import SVG from "react-inlinesvg";
import "./Dropdown.scss";

const Dropdown = ({
    children, options, isOpen = false, onClick,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen);

    const clickDropdown = () => {
        if (onClick) {
            onClick();
        }

        setIsDropdownOpen(!isDropdownOpen);
    };

    const clickAction = (action) => {
        setIsDropdownOpen(false);
        action();
    };

    useEffect(() => {
        setIsDropdownOpen(isOpen);
    }, [isOpen]);

    return (
        <div className="dropdown">
            <button onClick={clickDropdown} className="button" type="button">
                {children}
            </button>
            <ul className={`dropdown__list card ${isDropdownOpen ? "dropdown__list--open" : ""}`}>
                {options.map(({
                    icon, text, className, action,
                }) => (
                    <li key={text} className={`dropdown__option ${className || ""}`}>
                        <button
                            onClick={() => clickAction(action)}
                            className="button option__button"
                            type="button"
                        >
                            <SVG src={icon} className="option__icon" />
                            {text}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dropdown;
