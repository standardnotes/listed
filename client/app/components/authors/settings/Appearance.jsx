import React, { useState } from "react";
import "./Appearance.scss";
import ErrorToast from "../../shared/ErrorToast";

const Appearance = () => {
    const [isErrorToastDisplayed, setIsErrorToastDisplayed] = useState(false);
    const errorToastMessage = "";

    const handleSubmit = () => {

    };

    return (
        <form onSubmit={handleSubmit}>

            <ErrorToast
                message={errorToastMessage}
                isDisplayed={isErrorToastDisplayed}
                setIsDisplayed={setIsErrorToastDisplayed}
            />
        </form>
    );
};

Appearance.propTypes = {
};

export default (props) => <Appearance {...props} />;
