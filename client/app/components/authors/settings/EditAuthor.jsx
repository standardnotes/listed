import React, { useState } from "react";
import axios from "axios";

const EditAuthor = ({ author, authenticityToken }) => {
    const {
        username,
        display_name,
        bio,
        link,
        twitter,
        email,
        meta_image_url,
        header_image_url,
        guestbook_disabled,
        newsletter_disabled,
        hide_from_homepage
    } = author;

    const [editedAuthor, setEditedAuthor] = useState({
        username: username || "",
        display_name: display_name || "",
        bio: bio || "",
        link: link || "",
        twitter: twitter || "",
        email: email || "",
        meta_image_url: meta_image_url || "",
        header_image_url: header_image_url || "",
        guestbook_disabled: guestbook_disabled,
        newsletter_disabled: newsletter_disabled,
        hide_from_homepage: hide_from_homepage
    });

    const submitEditedAuthor = event => {
        event.preventDefault();

        axios
            .put(`/authors/${author.id}`, null, {
                headers: {
                    "X-CSRF-Token": authenticityToken,
                },
                data: {
                    author: editedAuthor
                }
            })
            .then(response => {
                window.location.href = response.request.responseURL;
            })
    };

    const editAuthor = (key, value) => (
        setEditedAuthor(prevState => (
            { ...prevState, [key]: value }
        ))
    );

    return(
        <div className="mt-20 form-box full">
            <form onSubmit={e => submitEditedAuthor(e)}>
                <div className="form-section">
                    <label htmlFor="author-username" className="label">
                        Username
                    </label>
                    <input
                        id="author-username"
                        className="field text-input"
                        value={editedAuthor.username}
                        onChange={e => editAuthor("username", e.target.value)}
                    ></input>
                </div>
                <div className="form-section">
                    <label htmlFor="author-display-name" className="label">
                        Display Name
                    </label>
                    <input
                        id="author-display-name"
                        className="field text-input"
                        value={editedAuthor.display_name}
                        onChange={e => editAuthor("display_name", e.target.value)}
                    ></input>
                </div>
                <div className="form-section">
                    <label htmlFor="author-bio" className="label">
                        Bio
                    </label>
                    <textarea
                        id="author-bio"
                        className="field text-input"
                        value={editedAuthor.bio}
                        onChange={e => editAuthor("bio", e.target.value)}
                    ></textarea>
                </div>
                <div className="form-section">
                    <label htmlFor ="author-link" className="label">
                        Link
                    </label>
                    <input
                        id="author-link"
                        className="field text-input"
                        value={editedAuthor.link}
                        onChange={e => editAuthor("link", e.target.value)}
                    ></input>
                </div>
                <div className="form-section">
                    <label htmlFor="author-twitter" className="label">
                        Twitter Username
                    </label>
                    <input
                        id="author-twitter"
                        className="field text-input"
                        value={editedAuthor.twitter}
                        onChange={e => editAuthor("twitter", e.target.value)}
                    ></input>
                </div>
                <div className="form-section">
                    <label htmlFor="author-email" className="label">
                        Email
                    </label>
                    <div style={{ fontSize: "14px", opacity: 0.5, marginBottom: "5px" }}>
                        Allows subscribers to reply to your posts, as well as notifies you when someone subscribes to your blog.
                        <input
                            id="author-email"
                            className="field text-input"
                            placeholder="Enter your email"
                            value={editedAuthor.email}
                            onChange={e => editAuthor("email", e.target.value)}
                        ></input>
                    </div>
                </div>
                <div className="form-section">
                    <label htmlFor="author-meta-image-url" className="label">
                        Meta image url
                    </label>
                    <div style={{ fontSize: "14px", opacity: 0.5, marginBottom: "5px" }}>
                        The image that will be used when generating link previews in Twitter, Slack, Facebook, etc.
                        <input
                            id="author-meta-image-url"
                            className="field text-input"
                            placeholder="Meta Image URL"
                            value={editedAuthor.meta_image_url}
                            onChange={e => editAuthor("meta_image_url", e.target.value)}
                        ></input>
                    </div>
                </div>
                <div className="form-section">
                    <label htmlFor="author-header-image-url" className="label">
                        Header image url
                    </label>
                    <div style={{ fontSize: "14px", opacity: 0.5, marginBottom: "5px" }}>
                        The image that will be displayed on top of your profile.
                        <input
                            id="author-header-image_url"
                            className="field text-input"
                            placeholder="Header Image URL"
                            value={editedAuthor.header_image_url}
                            onChange={e => editAuthor("header_image_url", e.target.value)}
                        ></input>
                    </div>
                </div>
                <div className="form-section">
                    <input
                        id="author-guestbook-disabled"
                        type="checkbox"
                        className="field inline"
                        value={editedAuthor.guestbook_disabled}
                        onChange={e => editAuthor("guestbook_disabled", e.target.checked)}
                    ></input>
                    <label htmlFor="author-guestbook-disabled" className="label inline">
                        Disable guestbook
                    </label>
                </div>
                <div className="form-section">
                    <input
                        id="author-newsletter-disabled"
                        type="checkbox"
                        className="field inline"
                        value={editedAuthor.newsletter_disabled}
                        onChange={e => editAuthor("newsletter_disabled", e.target.checked)}
                    ></input>
                    <label htmlFor="author-newsletter-disabled" className="label inline">
                        Disable email subscription and newsletter
                    </label>
                </div>
                <div className="form-section">
                    <input
                        id="author-hide-from-homepage"
                        type="checkbox"
                        className="field inline"
                        value={editedAuthor.hide_from_homepage}
                        onChange={e => editAuthor("hide_from_homepage", e.target.checked)}
                    ></input>
                    <label htmlFor="author-hide-from-homepage" className="label inline">
                        Hide profile from homepage 'Recent Authors'
                    </label>
                </div>
                <div className="form-section">
                    <input type="submit" value="Save"></input>
                </div>
            </form>
        </div>
    );
};

export default props => <EditAuthor {...props} />
