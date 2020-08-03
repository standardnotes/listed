import React, { useState } from "react";
import axios from "axios";

const Edit = ({ author, authenticityToken, authorCredentialUrl, credential }) => {
    const { key: credentialKey, value: credentialValue } = credential;

    const [editedCredential, setEditedCredential] = useState({
        key: credentialKey,
        value: credentialValue
    });

    const submitEditedCredential = event => {
        event.preventDefault();

        axios
            .patch(authorCredentialUrl, null, {
                headers: {
                    "X-CSRF-Token": authenticityToken,
                },
                data: {
                    credential: editedCredential
                }
            })
            .then(response => {
                window.location.href = response.request.responseURL;
            })
    }

    const deleteCredential = event => {
        event.preventDefault();

        axios
            .delete(authorCredentialUrl, {
                headers: {
                    "X-CSRF-Token": authenticityToken,
                }
            })
            .then(response => {
                window.location.href = response.request.responseURL;
            })
    }

    const editCredential = (key, value) => (
        setEditedCredential(prevState => (
            { ...prevState, [key]: value }
        ))
    );

    return(
        <div>
            <p>
                Edit payment credential for
                <strong> {author.display_name}</strong>
            </p>
            <div className="mt-20 form-box full">
                <form onSubmit={e => submitEditedCredential(e)}>
                    <div className="form-section">
                        <label htmlFor="credential-key" className="label">Key</label>
                        <input
                            id="credential-key"
                            className="field text-input"
                            value={editedCredential.key}
                            onChange={e => editCredential("key", e.target.value)}
                        ></input>
                    </div>
                    <div className="form-section mt-10">
                        <label htmlFor="credential-value" className="label">Value</label>
                        <input
                            id="credential-value"
                            className="field text-input"
                            value={editedCredential.value}
                            onChange={e => editCredential("value", e.target.value)}
                        ></input>
                    </div>
                    <div className="form-section mt-20">
                        <input type="submit" value="Save"></input>
                    </div>
                </form>
                <div className="mt-20">
                    <form className="button-to" onSubmit={e => deleteCredential(e)}>
                        <input type="submit" value="Delete"></input>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default props => <Edit {...props} />
