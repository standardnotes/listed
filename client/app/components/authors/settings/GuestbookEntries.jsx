import React from "react";
import moment from "moment";
import axios from "axios";

const GuestbookEntries = ({ guestbookEntries }) => {
    const handleEntryAction = (url) => {
        axios
            .get(url)
            .then(response => {
                window.location.href = response.request.responseURL;
            })
    };

    return(
        <div>
            <h3>Guestbook Entries</h3>
            <div className="guestbook sk-panel static">
                {guestbookEntries.length == 0 && (
                    <p>
                        No guestbook entries yet.
                    </p>
                )}
                {guestbookEntries.map(entry => (
                    <div key={entry.id} className="sk-notification contrast">
                        <p className="sk-p">
                            <strong>{entry.text}</strong>
                        </p>
                        <i className="sk-p">
                            {moment(entry.created_at).format("MMMM D, YYYY")}
                        </i>
                        {entry.signer_email && entry.donation_info.length > 0 && (
                            <p className="sk-p">
                                Author email: {entry.signer_email}
                            </p>
                        )}
                        {entry.donation_info && entry.donation_info.length > 0 && (
                            <p className="sk-p">
                                Donation info: {entry.donation_info}
                            </p>
                        )}
                        <div className="sk-horizontal-group mt-10">
                            {entry.public ? (
                                <a className="sk-p" href="#" onClick={e => handleEntryAction(entry.unapproval_url)}>
                                    Unpublish
                                </a>
                            ) : (
                                <a className="sk-p" href="#" onClick={e => handleEntryAction(entry.approval_url)}>
                                    Publish
                                </a>
                            )}
                            <a className="sk-p" href="#" onClick={e => handleEntryAction(entry.spam_url)}>
                                Report Spam
                            </a>
                            <a className="sk-p" href="#" onClick={e => handleEntryAction(entry.deletion_url)}>
                                Delete
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GuestbookEntries;
