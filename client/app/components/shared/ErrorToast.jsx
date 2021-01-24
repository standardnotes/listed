import React, { useState, useEffect } from "react";
import SVG from "react-inlinesvg";
import { IcClose } from "../../assets/icons";
import "./ErrorToast.scss";

const ErrorToast = ({ message, isDisplayed, setIsDisplayed }) => {
    const [isToastDisplayed, setIsToastDisplayed] = useState(false);
    const [toastTimeout, setToastTimeout] = useState(null);

    useEffect(() => {
        if (toastTimeout) {
            clearTimeout(toastTimeout);
        }

        setIsToastDisplayed(isDisplayed);

        if (isDisplayed) {
            setToastTimeout(setTimeout(() => setIsDisplayed(false), 5000));
        }

        return () => {
            if (toastTimeout) {
                clearTimeout(toastTimeout);
            }
        }
    }, [isDisplayed]);

    return (
        <div className={`error-toast ${isToastDisplayed ? "error-toast--visible" : ""}`}>
            <div className="error-toast__container">
                <div className="error-toast__toast">
                    <p className="p2 error-toast__message">
                        {message}
                    </p>
                    <button 
                        className="button error-toast__dismiss-button"
                        type="button"
                        onClick={() => setIsToastDisplayed(false)}
                    >
                        <SVG src={IcClose} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorToast;
