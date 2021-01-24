import React from "react";
import axios from 'axios';
import getAuthToken from "../../utils/getAuthToken";

const StartWriting = ({ className, children }) => {
    const createNewAuthor = async (event) => {
        event.preventDefault();

        try {
            const response = await axios
                .post("/authors", null, {
                    headers: {
                        "X-CSRF-Token": getAuthToken()
                    },
                })

            Turbolinks.visit(response.request.responseURL);
        } catch (err) {}
    };

    return(
        <button onClick={createNewAuthor} className={`${children ? "button" : "button button--primary"} ${className ? className : ""}`}>
            {children ? (
                children
            ) : (
                "Start writing"
            )}
        </button>
    );
};

export default StartWriting;
