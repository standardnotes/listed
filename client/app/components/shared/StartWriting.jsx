import PropTypes from "prop-types";
import React, { useState } from "react";
import ErrorToast from "./ErrorToast";

const StartWriting = ({ className, children = null }) => {
    const [isErrorToastDisplayed, setIsErrorToastDisplayed] = useState(false);
    const [errorToastMessage, setErrorToastMessage] = useState("");

    const createNewAuthor = async (event) => {
        event.preventDefault();
        setIsErrorToastDisplayed(false);

        try {
            Turbolinks.visit("new-author");
        } catch (err) {
            setErrorToastMessage("There was an error trying to generate a new author token for you. Please try again.");
            setIsErrorToastDisplayed(true);
        }
    };

    return (
        <>
            <button
                onClick={createNewAuthor}
                className={`${children ? "button" : "button button--primary"} ${className}`}
                type="button"
            >
                {children || "Start writing"}
            </button>
            <ErrorToast
                message={errorToastMessage}
                isDisplayed={isErrorToastDisplayed}
                setIsDisplayed={setIsErrorToastDisplayed}
            />
        </>
    );
};

StartWriting.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

StartWriting.defaultProps = {
    children: null,
    className: "",
};

export default StartWriting;
