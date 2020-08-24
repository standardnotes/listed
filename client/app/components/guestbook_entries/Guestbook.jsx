import React from "react";

export default ({ sent, author, entries, newAuthorGuestbookEntryUrl }) => {
    return(
        <div className="single-post-show">
            {sent && (
                <p>
                    <strong>
                        Thanks! Your message has been sent to the author. They'll need to confirm it before it appears in the public guestbook.
                    </strong>
                </p>
            )}
            <h3>
                <a href={author.url}>{author.title}</a>'s Guestbook
            </h3>
            {entries.map(entry => (
                <p key={entry.id}>
                    <i>{entry.text}</i>
                </p>
            ))}
            <a href={newAuthorGuestbookEntryUrl}>Sign {author.title}'s guestbook</a>
        </div>
    );
};
