import React from "react";
import moment from "moment";
import axios from "axios";
import SVG from "react-inlinesvg";
import Dropdown from "../../shared/Dropdown";
import getAuthToken from "../../../utils/getAuthToken";
import { IcEarth, IcEmail, IcEyeOff, IcMoreHorizontal, IcTrash } from "../../../assets/icons";
import "./GuestbookEntries.scss";

const GuestbookEntries = ({ guestbookEntries }) => {
    const handleEntryAction = (url) => {
        axios
            .post(url, null, {
                headers: {
                    "X-CSRF-Token": getAuthToken()
                }
            })
            .then(response => {
                window.location.href = response.request.responseURL;
            })
    };

    const dropdownOptions = entry => ([
        {
            icon: entry.public ? IcEyeOff : IcEarth,
            text: `Make ${entry.public ? "private" : "public"}`,
            action: () => handleEntryAction(entry.public ? entry.unapproval_url : entry.approval_url)
        },
        {
            icon: IcEmail,
            text: "Report spam",
            action: () => handleEntryAction(entry.spam_url)
        },
        {
            icon: IcTrash,
            text: "Delete",
            action: () => handleEntryAction(entry.deletion_url)
        }
    ]);

    return(
        <ul className="guestbook-entries">
            {guestbookEntries.length == 0 && (
                <p>
                    No guestbook entries yet.
                </p>
            )}
            {guestbookEntries.map(entry => (
                <li key={entry.id} className="guestbook-entries__item">
                    <div className="guestbook-entries__entry">
                        <p className="p2">
                            {entry.text}
                        </p>
                        <p className="p3 entry__details">
                            {entry.public ? (
                                <span className="entry-details__item">
                                    <SVG src={IcEarth} className="entry-details__icon" />
                                    Public
                                </span>
                            ) : (
                                <span className="entry-details__item">
                                    <SVG src={IcEyeOff} className="entry-details__icon" />
                                    Private
                                </span>
                            )}
                            <span className="entry-details__item">
                                {moment(entry.created_at).format("MMMM D, YYYY")}
                            </span>
                        </p>
                        {entry.donation_info && entry.donation_info.length > 0 && (
                            <p className="p3 entry__details entry__details--private">
                                <strong>Only visible to you: </strong>
                                {entry.signer_email && (
                                    <span className="entry-details__item">
                                        Author email: {entry.signer_email}
                                    </span>
                                )}
                                <span className="entry-details__item">
                                    Donation info: {entry.donation_info}
                                </span>
                            </p>
                        )}
                    </div>
                    <div className="guestbook-entries__hover-container">
                        <Dropdown options={dropdownOptions(entry)}>
                            <div className="hover-icon__container">
                                <SVG src={IcMoreHorizontal} className="hover-icon" />
                            </div>
                        </Dropdown>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default GuestbookEntries;
