import React from "react";
import axios from 'axios';
import getAuthToken from "../../utils/getAuthToken";

const StartWriting = ({ className, children }) => {
    const createNewAuthor = event => {
        event.preventDefault();

        axios
            .post("/authors", null, {
                headers: {
                    "X-CSRF-Token": getAuthToken()
                },
            })
            .then(response => {
                window.location.href = response.request.responseURL;
            });
    };

    return(
        <button onClick={createNewAuthor} className={`${children ? "" : "button button--primary"} ${className}`}>
            {children ? (
                children
            ) : (
                "Start writing"
            )}
        </button>
    );
};

export default StartWriting;
