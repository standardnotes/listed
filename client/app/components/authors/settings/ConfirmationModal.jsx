import React from "react";
import "./ConfirmationModal.scss";

const ConfirmationModal = ({ text, primaryOption, secondaryOption }) => {
    return (
        <div className="confirmation-modal__overlay">
            <div className="confirmation-modal__modal card">
                <p className="p2">
                    {text}
                </p>
                <div className="confirmation-modal__buttons">
                    <button className="button button--no-fill" onClick={secondaryOption.onClick}>
                        {secondaryOption.text}
                    </button>
                    <button className="button button--primary" onClick={primaryOption.onClick}>
                        {primaryOption.text}
                    </button>
                </div>
            </div>
        </div>  
    );
};

export default ConfirmationModal;
