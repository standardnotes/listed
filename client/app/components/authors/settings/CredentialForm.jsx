import React, { useState, useEffect } from "react";
import axios from "axios";
import getAuthToken from "../../../utils/getAuthToken";
import "./CredentialForm.scss";

const CredentialForm = ({ authorCredentialUrl, currentCredential }) => {
    const [credential, setCredential] = useState({
        key: currentCredential ? currentCredential.key : "",
        value: currentCredential ? currentCredential.value : ""
    });
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const submitCredential = event => {
        event.preventDefault();

        if (currentCredential) {
            axios
                .patch(authorCredentialUrl, null, {
                    headers: {
                        "X-CSRF-Token": getAuthToken()
                    },
                    data: {
                        credential: credential
                    }
                })
                .then(response => {
                    Turbolinks.visit(response.request.responseURL);
                })
        } else {
            axios
                .post(authorCredentialUrl, null, {
                    headers: {
                        "X-CSRF-Token": getAuthToken()
                    },
                    data: {
                        credential: credential
                    }
                })
                .then(response => {
                    Turbolinks.visit(response.request.responseURL);
                })
        }
    }

    const editCredential = (key, value) => (
        setCredential(prevState => (
            { ...prevState, [key]: value }
        ))
    );

    useEffect(() => {
        setIsSubmitDisabled(!credential.key || !credential.value);
    }, [credential]);

    return(
        <form className="credential-form" onSubmit={e => submitCredential(e)}>
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
                        onChange={e => editCredential("key", e.target.value)}
                    ></input>
                </div>
                <div className="form-section">
                    <label htmlFor="credential-value" className="label label--required p2">
                        Value
                    </label>
                    <input
                        id="domain"
                        className="text-field"
                        required="required"
                        placeholder="Value"
                        value={credential.value}
                        onChange={e => editCredential("value", e.target.value)}
                    ></input>
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

export default CredentialForm;
