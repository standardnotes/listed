import React, { useState } from "react";
import SVG from "react-inlinesvg";
import "./Dropdown.scss";

const Dropdown = ({ children, options }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return(
        <div className="dropdown">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="button">
                {children}
            </button>
            <ul className={`dropdown__list card ${isDropdownOpen ? "dropdown__list--open" : ""}`}>
                {options.map(({ icon, text, className, action }) => (
                    <li key={text} className={`dropdown__option ${className || ""}`}>
                        <button onClick={action} className="button option__button">
                            <SVG src={icon} className="option__icon" />
                            {text}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dropdown;
