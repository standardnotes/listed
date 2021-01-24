import React, { useState } from "react";
import axios from 'axios';
import ErrorToast from "../shared/ErrorToast";
import getAuthToken from "../../utils/getAuthToken";

const StartWriting = ({ className, children }) => {
    const [isErrorToastDisplayed, setIsErrorToastDisplayed] = useState(false);
    const [errorToastMessage, setErrorToastMessage] = useState("");

    const createNewAuthor = async (event) => {
        event.preventDefault();
        setIsErrorToastDisplayed(false);

        try {
            const response = await axios
                .post("/authors", null, {
                    headers: {
                        "X-CSRF-Token": getAuthToken()
                    },
                })

            Turbolinks.visit(response.request.responseURL);
        } catch (err) {
            setErrorToastMessage("There was an error trying to generate a new author token for you. Please try again.")
            setIsErrorToastDisplayed(true);
        }
    };

    return(
        <>
            <button onClick={createNewAuthor} className={`${children ? "button" : "button button--primary"} ${className ? className : ""}`}>
                {children ? (
                    children
                ) : (
                    "Start writing"
                )}
            </button>
            <ErrorToast
                message={errorToastMessage}
                isDisplayed={isErrorToastDisplayed}
                setIsDisplayed={setIsErrorToastDisplayed}
            />
        </>
    );
};

export default StartWriting;
