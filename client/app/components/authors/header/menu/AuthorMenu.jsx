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

    const getLinkClassName = (isActive) => `button page-link ${isActive ? "button--active" : "button--no-fill"}`;

    return (
        <nav className={navClassName()}>
            <a
                href={author.url}
                className={getLinkClassName(isActiveMenuItem(author.url))}
            >
                Home
            </a>
            {pages.map((page) => (
                <a
                    key={page.id}
                    href={page.author_relative_url}
                    className={getLinkClassName(isActiveMenuItem(page.author_relative_url))}
                >
                    {page.title}
                </a>
            ))}
            {author.credentials.length > 0 && (
                <a
                    href={`${author.url}/tip`}
                    className={getLinkClassName(isActiveMenuItem(`${author.url}/tip`))}
                >
                    Thank
                </a>
            )}
            {author.guestbook_disabled || (
                <a
                    href={authorGuestbookEntriesUrl}
                    className={getLinkClassName(currentUrl.includes("guestbook"))}
                >
                    Guestbook
                </a>
            )}
            {!author.newsletter_disabled && (
                <a
                    href={`${author.url}/subscribe`}
                    className={getLinkClassName(isSubscribeMenuItemActive())}
                >
                    Subscribe
                </a>
            )}
        </nav>
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
    ).isRequired,
};

export default AuthorMenu;
