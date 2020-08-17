import React from "react";
import axios from "axios";

export default ({ deleteAllDataError, author, authenticityToken }) => {
    const showDeleteConfirmation = event => {
        const buttons = [
            {
                text: "Cancel",
                style: "neutral",
                action: () => {
                    // Do nothing...
                },
            },
            {
                text: "Delete My Blog",
                style: "danger",
                action: () => {
                    submitDeleteAllData();
                },
            },
        ];
        
        const confirmation = new Stylekit.SKAlert({
            title: "Permanently Delete Blog",
            text:
                "Are you sure you want to permanently delete your Listed blog and all associated posts? Note that this will not affect any of the source notes in your Standard Notes account.",
            buttons,
        });
        
        event.preventDefault();
        confirmation.present();
    };

    const submitDeleteAllData = () => {
        axios
            .post(`/authors/${author.id}/delete_all_data`, null, {
                headers: {
                    "X-CSRF-Token": authenticityToken,
                },
                data: {
                    secret: author.secret
                }
            })
            .then(response => {
                window.location.href = response.request.responseURL;
            })
    }
    
    return (
        <div className="mt-30 form-box full">
            <strong>Delete Blog</strong>
            <p>
                Delete yout Listed blog and all accompanying data.
            </p>
            {deleteAllDataError && (
                <div className="alert error">
                    <strong>{deleteAllDataError}</strong>
                </div>
            )}
            <form onSubmit={e => showDeleteConfirmation(e)}>
                <div className="form-section">
                    <input type="submit" value="Delete Blog" className="delete-blog"></input>
                </div>
            </form>
        </div>
    );
};
