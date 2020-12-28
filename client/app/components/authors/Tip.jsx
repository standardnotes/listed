import React from "react";

export default ({ displayAuthor, newAuthorGuestbookEntryUrl }) => {
    return(
        <div id="tip" className="single-post-show">
            <p>
                The world is made good when good ideas are supported. You can tip or thank
                <strong> {displayAuthor.title} </strong>
                to encourage the author to continue doing their best work.
                Tipping is telling the author:
                <i> keep doing what you're doing</i>,
                or,
                <i> I want to see more of this in the world</i>.
            </p>
            <p>
                The author has specified the following payment credentials.
                Once you've made a contribution to <strong> {displayAuthor.display_name}</strong>, be sure to signal their{" "}
                <a href={newAuthorGuestbookEntryUrl}>guestbook</a>
                {" "}to let them know!
            </p>
            {displayAuthor.credentials.map(credential => (
                <p key={credential.id}>
                    <strong>{credential.key}: </strong>
                    {credential.value}
                </p>
            ))}
        </div>
    );
};
