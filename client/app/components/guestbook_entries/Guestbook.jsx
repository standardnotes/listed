import PropTypes from "prop-types";
import React, { useState } from "react";
import New from "./New";
import "./Guestbook.scss";

const Guestbook = ({
    sent, author, entries, hCaptchaSiteKey,
}) => {
    const [showNewEntryForm, setShowNewEntryForm] = useState(false);

    const renderForm = () => {
        if (showNewEntryForm) {
            return (
                <New
                    author={author}
                    hCaptchaSiteKey={hCaptchaSiteKey}
                />
            );
        }

        return (
            sent ? (
                <div className="callout callout--success">
                    Your message has been sent to the author.
                    They&apos;ll need to confirm it before it appears in the public guestbook.
                </div>
            ) : (
                <div className="guestbook__new-entry-button-container">
                    <button className="button button--primary" type="button" onClick={() => setShowNewEntryForm(true)}>
                        New entry
                    </button>
                    {entries.length > 0 ? (
                        <p className="p1">
                            Write something in
                            {" "}
                            {author.title}
                            &apos;s guestbook!
                        </p>
                    ) : (
                        <p className="p1">
                            Sign
                            {" "}
                            {author.title}
                            &apos;s guestbook!
                        </p>
                    )}
                </div>
            )
        );
    };

    return (
        <div className="page-container guestbook__container">
            <h1 className="h1">
                Guestbook
            </h1>
            {renderForm()}
            {entries.map((entry) => (
                <p key={entry.id} className="p1 guestbook__entry">
                    {entry.text}
                </p>
            ))}
        </div>
    );
};

Guestbook.propTypes = {
    author: PropTypes.shape({
        title: PropTypes.string.isRequired,
    }).isRequired,
    entries: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
        }),
    ).isRequired,
    hCaptchaSiteKey: PropTypes.string.isRequired,
    sent: PropTypes.bool,
};

Guestbook.defaultProps = {
    sent: false,
};

export default (props) => <Guestbook {...props} />;
