import PropTypes from "prop-types";
import React from "react";
import "./Tip.scss";

const Tip = ({ displayAuthor, authorGuestbookEntriesUrl }) => (
    <div id="tip" className="page-container">
        <h1 className="h1">Thank</h1>
        <p className="p1">
            The world is made good when good ideas are supported. You can tip or thank
            <strong>
                {" "}
                {displayAuthor.title}
                {" "}
            </strong>
            to encourage the author to continue doing their best work.
            Tipping is telling the author:
            <i> keep doing what you&apos;re doing</i>
            ,
            or,
            <i> I want to see more of this in the world</i>
            .
        </p>
        <p className="p1">
            The author has specified the following payment credentials.
            Once you&apos;ve made a contribution to
            {" "}
            <strong>
                {" "}
                {displayAuthor.display_name}
            </strong>
            , be sure to signal their
            {" "}
            <a href={authorGuestbookEntriesUrl}>guestbook</a>
            {" "}
            to let them know!
        </p>
        <div className="tip__credentials">
            {displayAuthor.credentials.map((credential) => (
                <div className="callout callout--success" key={credential.id}>
                    <strong>
                        {credential.key}
                        :
                        {" "}
                    </strong>
                    {credential.value}
                </div>
            ))}
        </div>
    </div>
);

Tip.propTypes = {
    authorGuestbookEntriesUrl: PropTypes.string.isRequired,
    displayAuthor: PropTypes.shape({
        credentials: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                key: PropTypes.string.isRequired,
                value: PropTypes.string.isRequired,
            }),
        ).isRequired,
        display_name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
};

export default Tip;
