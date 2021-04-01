import React from "react";
import PropTypes from "prop-types";
import "./AuthorMenu.scss";

const AuthorMenu = ({
    isMobileMenuOpen, isDesktopMenu, author, pages, authorGuestbookEntriesUrl, currentUrl,
}) => {
    const isActiveMenuItem = (url) => url === currentUrl;

    const isSubscribeMenuItemActive = () => (
        isActiveMenuItem(`${author.url}/subscribe`) || currentUrl.includes("subscriptions")
    );

    const navClassName = () => {
        if (isDesktopMenu) {
            return "pages-menu author-pages-menu--desktop pages-menu--desktop";
        }

        return `pages-menu--mobile ${isMobileMenuOpen ? "pages-menu--mobile-visible" : ""}`;
    };

    const hasCredentials = () => author.credentials.length > 0;

    const hasPages = () => pages && pages.length > 0;

    const hasGuestbook = () => !author.guestbook_disabled;

    const hasNewsletter = () => !author.newsletter_disabled;

    const shouldRenderMenu = () => hasPages() || hasCredentials()
        || hasGuestbook() || hasNewsletter();

    return (
        shouldRenderMenu()
            ? (
                <nav className={navClassName()}>
                    <a
                        href={author.url}
                        className={`button page-link ${isActiveMenuItem(author.url) ? "button--active" : "button--no-fill"}`}
                    >
                        Home
                    </a>
                    {hasPages() && pages.map((page) => (
                        <a
                            key={page.id}
                            href={page.author_relative_url}
                            className={`button page-link ${isActiveMenuItem(page.author_relative_url) ? "button--active" : "button--no-fill"}`}
                        >
                            {page.title}
                        </a>
                    ))}
                    {hasCredentials() && (
                        <a
                            href={`${author.url}/tip`}
                            className={`button page-link ${isActiveMenuItem(`${author.url}/tip`) ? "button--active" : "button--no-fill"}`}
                        >
                            Thank
                        </a>
                    )}
                    {hasGuestbook() && (
                        <a
                            href={authorGuestbookEntriesUrl}
                            className={`button page-link ${currentUrl.includes("guestbook") ? "button--active" : "button--no-fill"}`}
                        >
                            Guestbook
                        </a>
                    )}
                    {hasNewsletter() && (
                        <a
                            href={`${author.url}/subscribe`}
                            className={`button page-link ${isSubscribeMenuItemActive() ? "button--active" : "button--no-fill"}`}
                        >
                            Subscribe
                        </a>
                    )}
                </nav>
            )
            : null
    );
};

AuthorMenu.propTypes = {
    author: PropTypes.shape({
        credentials: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
            }),
        ).isRequired,
        guestbook_disabled: PropTypes.bool.isRequired,
        newsletter_disabled: PropTypes.bool.isRequired,
        url: PropTypes.string.isRequired,
    }).isRequired,
    authorGuestbookEntriesUrl: PropTypes.string.isRequired,
    currentUrl: PropTypes.string.isRequired,
    isDesktopMenu: PropTypes.bool.isRequired,
    isMobileMenuOpen: PropTypes.bool.isRequired,
    pages: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            author_relative_url: PropTypes.string.isRequired,
        }),
    ),
};

AuthorMenu.defaultProps = {
    pages: null,
};

export default AuthorMenu;
