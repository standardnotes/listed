import React, { useState } from "react";
import axios from "axios";
import getAuthToken from "../../utils/getAuthToken";
import New from "./New";
import "./Guestbook.scss";

const Guestbook = ({ sent, author, entries, newAuthorGuestbookEntryUrl, hCaptchaSiteKey }) => {
    const [showNewEntryForm, setShowNewEntryForm] = useState(false);

    const createNewEntry = event => {
        event.preventDefault();

        axios
            .get(newAuthorGuestbookEntryUrl, null, {
                headers: {
                    "X-CSRF-Token": getAuthToken(),
                }
            })
            .then(() => {
                setShowNewEntryForm(true);
            });
    };

    return(
        <div className="page-container guestbook__container">
            <h1 className="h1">
                Guestbook
            </h1>
            {showNewEntryForm ? (
                <New
                    author={author}
                    hCaptchaSiteKey={hCaptchaSiteKey}
                />
            ) : (
                sent ? (
                    <div className="callout callout--success">
                        Your message has been sent to the author. They'll need to confirm it before it appears in the public guestbook.
                    </div>
                ) : (
                    <div className="guestbook__new-entry-button-container">
                        <button className="button button--primary" onClick={createNewEntry}>
                            New entry
                        </button>
                        {entries.length > 0 ? (
                            <p className="p1">Write something in {author.title}'s guestbook!</p>
                        ) : (
                            <p className="p1">Be the first to sign {author.title}'s guestbook!</p>
                        )}
                    </div>
                )
            )}
            {entries.map(entry => (
                <p key={entry.id} className="p1 guestbook__entry">
                    {entry.text}
                </p>
            ))}
        </div>
    );
};

export default props => <Guestbook {...props} />;
