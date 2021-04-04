import PropTypes from "prop-types";
import React, { useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import SVG from "react-inlinesvg";
import ConfirmationModal from "./ConfirmationModal";
import Dropdown from "../../shared/Dropdown";
import {
    IcEarth, IcEmail, IcEyeOff, IcMoreHorizontal, IcTrash,
} from "../../../assets/icons";
import "./GuestbookEntries.scss";

const GuestbookEntries = ({ guestbookEntries, setErrorToastMessage, setIsErrorToastDisplayed }) => {
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [confirmationModalDisplayed, setConfirmationModalDisplayed] = useState(null);

    const handleEntryAction = async (url, text) => {
        setIsErrorToastDisplayed(false);
        setConfirmationModalDisplayed(null);

        try {
            const response = await axios
                .get(url);

            Turbolinks.visit(response.request.responseURL);
        } catch (err) {
            setErrorToastMessage(`There was an error trying to ${text}. Please try again.`);
            setIsErrorToastDisplayed(true);
        }
    };

    const dropdownOptions = (entry) => {
        const options = [
            {
                icon: IcEmail,
                text: "Report spam",
                action: () => handleEntryAction(entry.spam_url, "report the entry"),
            },
            {
                icon: IcTrash,
                text: "Delete",
                action: () => setConfirmationModalDisplayed(entry.id),
            },
        ];

        if (entry.public) {
            options.unshift({
                icon: IcEyeOff,
                text: "Make private",
                action: () => handleEntryAction(entry.unapproval_url, "make the entry private"),
            });
        } else {
            options.unshift({
                icon: IcEarth,
                text: "Publish",
                className: "guestbook-entries__action--make-public",
                action: () => handleEntryAction(entry.approval_url, "make the entry public"),
            });
        }

        return options;
    };

    return (
        <ul className="guestbook-entries">
            {guestbookEntries.length === 0 && (
                <p>
                    No guestbook entries yet.
                </p>
            )}
            {guestbookEntries.map((entry) => (
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
                                {dayjs(entry.created_at).format("MMMM D, YYYY")}
                            </span>
                        </p>
                        {(entry.signer_email || entry.donation_info) && (
                            <p className="p3 entry__details entry__details--private">
                                <strong>Only visible to you: </strong>
                                {entry.signer_email && (
                                    <span className="entry-details__item">
                                        Signer email:
                                        <strong>{entry.signer_email}</strong>
                                    </span>
                                )}
                                {entry.donation_info && (
                                    <span className="entry-details__item">
                                        Donation info:
                                        <strong>{entry.donation_info}</strong>
                                    </span>
                                )}
                            </p>
                        )}
                    </div>
                    <div className="hover-content">
                        {!entry.public && (
                            <button
                                className="button button--primary button--make-public"
                                type="button"
                                onClick={() => handleEntryAction(entry.approval_url, "make the entry public")}
                            >
                                Publish
                            </button>
                        )}
                        <Dropdown
                            options={dropdownOptions(entry)}
                            isOpen={!!dropdownOpen && dropdownOpen === entry.id}
                            onClick={() => setDropdownOpen(entry.id)}
                        >
                            <div className="hover-content__icon-container">
                                <SVG src={IcMoreHorizontal} className="hover-content__icon" />
                            </div>
                        </Dropdown>
                    </div>
                    {confirmationModalDisplayed && confirmationModalDisplayed === entry.id && (
                        <ConfirmationModal
                            text="Are you sure you want to delete this guestbook entry?"
                            primaryOption={{
                                text: "Cancel",
                                onClick: () => setConfirmationModalDisplayed(null),
                            }}
                            secondaryOption={{
                                text: "Delete",
                                onClick: () => handleEntryAction(entry.deletion_url, "delete this entry"),
                            }}
                        />
                    )}
                </li>
            ))}
        </ul>
    );
};

GuestbookEntries.propTypes = {
    guestbookEntries: PropTypes.arrayOf(
        PropTypes.shape({
            approval_url: PropTypes.string.isRequired,
            created_at: PropTypes.string.isRequired,
            deletion_url: PropTypes.string.isRequired,
            donation_info: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
            public: PropTypes.bool.isRequired,
            signer_email: PropTypes.string.isRequired,
            spam_url: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            unapproval_url: PropTypes.string.isRequired,
        }),
    ).isRequired,
    setErrorToastMessage: PropTypes.func.isRequired,
    setIsErrorToastDisplayed: PropTypes.func.isRequired,
};

export default GuestbookEntries;
