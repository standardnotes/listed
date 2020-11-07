import React from "react";
import SVG from "react-inlinesvg";
import { IcCheckboxChecked, IcCheckboxEmpty } from "../../assets/icons";
import "./Checkbox.scss";

const Checkbox = ({ id, onClick, checked, label }) => {
    return(
        <div className="form-section checkbox__container">
            <input
                id={id}
                type="checkbox"
                className="checkbox"
                defaultChecked={checked}
                onClick={e => onClick(e.target.checked)}
            ></input>
            <div className="checkbox__icon-container">
                <SVG
                    src={checked ? IcCheckboxChecked : IcCheckboxEmpty} 
                    onClick={() => onClick(!checked)}
                />
            </div>
            <label htmlFor={id} className="p2">
                {label}
            </label>
        </div>
    );
};

export default Checkbox;
