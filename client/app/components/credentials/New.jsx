import React, { useState } from "react";
import axios from "axios";

const New = ({ author, authenticityToken, authorCredentialsUrl }) => {
    const [credential, setCredential] = useState({
        key: "",
        value: ""
    });

    const submitCredential = event => {
        event.preventDefault();

        axios
            .post(authorCredentialsUrl, null, {
                headers: {
                    "X-CSRF-Token": authenticityToken,
                },
                data: {
                    credential: credential
                }
            })
            .then(response => {
                window.location.href = response.request.responseURL;
            })
    }

    const editCredential = (key, value) => (
        setCredential(prevState => (
            { ...prevState, [key]: value }
        ))
    );

    return(
        <div>
            <p>
                Add a new payment credential for
                <strong> {author.display_name}</strong>
            </p>
            <div className="mt-20 form-box full">
                <form onSubmit={e => submitCredential(e)}>
                    <div className="form-section">
                        <label htmlFor="credential-key" className="label">Key</label>
                        <input
                            id="credential-key"
                            className="field text-input"
                            value={credential.key}
                            onChange={e => editCredential("key", e.target.value)}
                        ></input>
                    </div>
                    <div className="form-section mt-10">
                        <label htmlFor="credential-value" className="label">Value</label>
                        <input
                            id="credential-value"
                            className="field text-input"
                            value={credential.value}
                            onChange={e => editCredential("value", e.target.value)}
                        ></input>
                    </div>
                    <div className="form-section mt-20">
                        <input type="submit" value="Save"></input>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default props => <New {...props} />
