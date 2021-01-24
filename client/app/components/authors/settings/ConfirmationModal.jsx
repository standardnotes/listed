import React, { useState } from "react";
import "./ConfirmationModal.scss";

const ConfirmationModal = ({ text, primaryOption, secondaryOption }) => {
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

    const onClickSecondary = async () => {
        setIsSubmitDisabled(true);

        try {
            await secondaryOption.onClick();
        } catch (err) {
            setIsSubmitDisabled(false);
        }
    }

    return (
        <div className="confirmation-modal__overlay">
            <div className="confirmation-modal__modal card">
                <p className="p2">
                    {text}
                </p>
                <div className="confirmation-modal__buttons">
                    <button
                        className={`button ${isSubmitDisabled ? "button--secondary-disabled" : "button--no-fill"}`}
                        onClick={onClickSecondary}
                        disabled={isSubmitDisabled}
                    >
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
