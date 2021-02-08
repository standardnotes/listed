import PropTypes from "prop-types";
import React from "react";
import dayjs from "dayjs";

const UnreadGuestbookEntries = ({ author, entries }) => (
    <div>
        <h3>
            Hey
            {author.display_name}
            ,
        </h3>
        <p>
            <strong>Someone has signed your guestbook!</strong>
        </p>
        {entries.map((entry) => (
            <div key={entry.id}>
                <p>
                    <strong>
                        On
                        {dayjs(entry.created_at).format("MMMM D, YYYY HH:mm")}
                        :
                    </strong>
                </p>
                <p>
                    <i>{entry.text}</i>
                </p>
                {entry.donation_info && entry.donation_info.length > 0 && (
                    <div>
                        <p>The signer has also left this donation info:</p>
                        <p>
                            <i>{entry.donation_info}</i>
                        </p>
                    </div>
                )}
                <p>
                    This post is private and not yet published.
                    If you&apos;d like it to appear on your public guestbook, click Publish below.
                    If after you&apos;ve published the entry you&apos;d like to unpublish it,
                    click Unpublish below.
                </p>
                <p>
                    <a href={entry.approval_url}>
                        <strong>Publish</strong>
                    </a>
                </p>
                <p>
                    <a href={entry.unapproval_url}>
                        <strong>Unpublish</strong>
                    </a>
                </p>
                <p>
                    <a href={entry.spam_url}>
                        <strong>Report Spam</strong>
                    </a>
                </p>
                {entry.signer_email && entry.signer_email.length > 0 && (
                    <p>
                        The signer has indicated that their email address is
                        {" "}
                        <a href={`mailto:${entry.signer_email}`}>{entry.signer_email}</a>
                        .
                        Feel free to shoot them an email sending your thanks!
                    </p>
                )}
                <hr className="left" />
            </div>
        ))}
    </div>
);

UnreadGuestbookEntries.propTypes = {
    author: PropTypes.shape({
        display_name: PropTypes.string.isRequired,
    }).isRequired,
    entries: PropTypes.arrayOf(
        PropTypes.shape({
            approval_url: PropTypes.string.isRequired,
            created_at: PropTypes.string.isRequired,
            donation_info: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
            private: PropTypes.bool.isRequired,
            signer_email: PropTypes.string.isRequired,
            spam_url: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            unapproval_url: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default UnreadGuestbookEntries;
