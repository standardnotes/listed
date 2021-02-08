import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import axios from "axios";
import getAuthToken from "../../../utils/getAuthToken";
import "./CredentialForm.scss";

const CredentialForm = ({
    authorCredentialUrl, currentCredential, setIsErrorToastDisplayed, setErrorToastMessage,
}) => {
    const [credential, setCredential] = useState({
        key: currentCredential ? currentCredential.key : "",
        value: currentCredential ? currentCredential.value : "",
    });
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const submitCredential = async (event) => {
        event.preventDefault();
        setIsSubmitDisabled(true);
        setIsErrorToastDisplayed(false);

        if (currentCredential) {
            try {
                const response = await axios
                    .patch(authorCredentialUrl, null, {
                        headers: {
                            "X-CSRF-Token": getAuthToken(),
                        },
                        data: {
                            credential,
                        },
                    });

                Turbolinks.visit(response.request.responseURL);
            } catch (err) {
                setIsSubmitDisabled(false);
                setErrorToastMessage("There was an error trying to update the payment detail. Please try again.");
                setIsErrorToastDisplayed(true);
            }
        } else {
            try {
                const response = await axios
                    .post(authorCredentialUrl, null, {
                        headers: {
                            "X-CSRF-Token": getAuthToken(),
                        },
                        data: {
                            credential,
                        },
                    });

                Turbolinks.visit(response.request.responseURL);
            } catch (err) {
                setIsSubmitDisabled(false);
                setErrorToastMessage("There was an error trying to create the payment detail. Please try again.");
                setIsErrorToastDisplayed(true);
            }
        }
    };

    const editCredential = (key, value) => (
        setCredential((prevState) => (
            { ...prevState, [key]: value }
        ))
    );

    useEffect(() => {
        setIsSubmitDisabled(!credential.key || !credential.value);
    }, [credential]);

    return (
        <form className="credential-form" onSubmit={(e) => submitCredential(e)}>
            <div className="form-row">
                <div className="form-section">
                    <label htmlFor="credential-key" className="label label--required p2">
                        Key
                    </label>
                    <input
                        id="credential-key"
                        className="text-field"
                        required="required"
                        placeholder="Key"
                        value={credential.key}
                        onChange={(e) => editCredential("key", e.target.value)}
                    />
                </div>
                <div className="form-section">
                    <label htmlFor="credential-value" className="label label--required p2">
                        Value
                    </label>
                    <input
                        id="credential-value"
                        className="text-field"
                        required="required"
                        placeholder="Value"
                        value={credential.value}
                        onChange={(e) => editCredential("value", e.target.value)}
                    />
                </div>
                <div className="form-section">
                    <button
                        type="submit"
                        className={`button ${isSubmitDisabled ? "button--disabled" : "button--primary"}`}
                        disabled={isSubmitDisabled}
                    >
                        {currentCredential ? "Edit" : "Add"}
                    </button>
                </div>
            </div>
        </form>
    );
};

CredentialForm.propTypes = {
    authorCredentialUrl: PropTypes.string.isRequired,
    currentCredential: PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    }),
    setErrorToastMessage: PropTypes.func.isRequired,
    setIsErrorToastDisplayed: PropTypes.func.isRequired,
};

CredentialForm.defaultProps = {
    currentCredential: null,
};

export default CredentialForm;
