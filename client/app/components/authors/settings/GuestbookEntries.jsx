import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import SVG from "react-inlinesvg";
import ConfirmationModal from "./ConfirmationModal";
import Dropdown from "../../shared/Dropdown";
import getAuthToken from "../../../utils/getAuthToken";
import { IcEarth, IcEmail, IcEyeOff, IcMoreHorizontal, IcTrash } from "../../../assets/icons";
import "./GuestbookEntries.scss";

const GuestbookEntries = ({ guestbookEntries }) => {
    const [dropdownOpen, setDropdownOpen] = useState(null); 
    const [confirmationModalDisplayed, setConfirmationModalDisplayed] = useState(null);

    const handleEntryAction = async (url) => {
        await axios
            .get(url)
            .then(response => {
                Turbolinks.visit(response.request.responseURL);
            })
    };

    const dropdownOptions = entry => {
        const options = [
            {
                icon: IcEmail,
                text: "Report spam",
                action: () => handleEntryAction(entry.spam_url)
            },
            {
                icon: IcTrash,
                text: "Delete",
                action: () => setConfirmationModalDisplayed(entry.id)
            }
        ];

        if (entry.public) {
            options.unshift(        {
                icon: IcEyeOff,
                text: "Make private",
                action: () => handleEntryAction(entry.unapproval_url)
            });
        } else {
            options.unshift(        {
                icon: IcEarth,
                text: "Publish",
                className: "guestbook-entries__action--make-public",
                action: () => handleEntryAction(entry.approval_url)
            });
        }

        return options;
    };

    return(
        <ul className="guestbook-entries">
            {guestbookEntries.length == 0 && (
                <p>
                    No guestbook entries yet.
                </p>
            )}
            {guestbookEntries.map(entry => (
                <li key={entry.id} className="guestbook-entries__item hover-container">
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
                    <div className="hover-content">
                        {!entry.public && (
                            <button
                                className="button button--primary button--make-public"
                                onClick={() => handleEntryAction(entry.approval_url)}
                            >
                                Publish
                            </button>
                        )}
                        <Dropdown   
                            options={dropdownOptions(entry)}
                            isOpen={dropdownOpen && dropdownOpen === entry.id}
                            onClick={() => setDropdownOpen(entry.id)}
                        >
                            <div className="hover-content__icon-container">
                                <SVG src={IcMoreHorizontal} className="hover-content__icon" />
                            </div>
                        </Dropdown>
                    </div>
                    {confirmationModalDisplayed && confirmationModalDisplayed === entry.id && (
                        <ConfirmationModal
                            text={"Are you sure you want to delete this guestbook entry?"}
                            primaryOption={{
                                text: "Cancel",
                                onClick: () => setConfirmationModalDisplayed(null),
                            }}
                            secondaryOption={{
                                text: "Delete",
                                onClick: () => handleEntryAction(entry.deletion_url),
                            }}
                        />
                    )}
                </li>
            ))}
        </ul>
    );
};

export default GuestbookEntries;
