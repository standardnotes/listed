import React from "react";
import SVG from "react-inlinesvg";
import { IcOpenIn } from "../../assets/icons";
import "./Resources.scss";

const Resources = () => {
    const resourceItems = [
        {
            text: "Creating a Blog From Your Notes with Listed and Standard Notes",
            href: "https://standardnotes.org/help/60/creating-a-blog-from-your-notes-with-listed-and-standard-notes",
        },
        {
            text: "How do I register for a Listed blog?",
            href: "https://standardnotes.org/help/61/how-do-i-register-for-a-listed-blog",
        },
        {
            text: "How do I publish articles to Listed?",
            href: "https://standardnotes.org/help/62/how-do-i-publish-articles-to-listed",
        },
        {
            text: "How do I manage my blog settings, like username and domain?",
            href: "https://standardnotes.org/help/63/how-do-i-manage-my-blog-settings-like-username-and-domain",
        },
        {
            text: "How do I email my subscribers about new articles and updates?",
            href: "https://standardnotes.org/help/64/how-do-i-email-my-subscribers-about-new-articles-and-updates",
        },
        {
            text: "What is my Listed guestbook?",
            href: "https://standardnotes.org/help/65/what-is-my-listed-guestbook",
        },
        {
            text: "How do I change the colors, fonts, and general layout of my Listed blog?",
            href: "https://standardnotes.org/help/66/how-do-i-change-the-colors-fonts-and-general-layout-of-my-listed-blog",
        },
        {
            text: "How do I specify a custom date for a post, or set the canonical URL?",
            href: "https://standardnotes.org/help/67/how-do-i-specify-a-custom-date-for-a-post-or-set-the-canonical-url",
        },
        {
            text: "How do I hide a story from my main feed?",
            href: "https://standardnotes.org/help/68/how-do-i-hide-a-story-from-my-main-feed",
        },
    ];

    return (
        <ul className="resources__list">
            {resourceItems.map(({ text, href }) => (
                <li key={text} className="p2">
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button resources__link hover-container"
                    >
                        {text}
                        <div className="hover-content resources__hover-content">
                            <div className="hover-content__icon-container">
                                <SVG src={IcOpenIn} className="hover-content__icon" />
                            </div>
                        </div>
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default Resources;
