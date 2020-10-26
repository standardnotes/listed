import React from "react";
import "./Guestbook.scss";

export default ({ sent, author, entries, newAuthorGuestbookEntryUrl }) => {
    return(
        <div className="page-container guestbook__container">
            <h1 className="h1">
                Guestbook
            </h1>
            {!sent && (
                <div className="guestbook__new-entry-button-container">
                    <a className="button button--primary" href={newAuthorGuestbookEntryUrl}>New entry</a>
                    {entries.length > 0 ? (
                        <p className="p1">Write something in {author.title}'s guestbook!</p>
                    ) : (
                        <p className="p1">Be the first to sign {author.title}'s guestbook!</p>
                    )}
                </div>
            )}
            {sent && (
                <div className="callout callout--success">
                    Your message has been sent to the author. They'll need to confirm it before it appears in the public guestbook.
                </div>
            )}
            {entries.map(entry => (
                <p key={entry.id} className="p1 guestbook__entry">
                    {entry.text}
                </p>
            ))}
        </div>
    );
};
