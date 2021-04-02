import React from "react";
import PropTypes from "prop-types";
import MenuItem from "./MenuItem";

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

    return (
        <nav className={navClassName()}>
            <MenuItem isActive={isActiveMenuItem(author.url)} url={author.url}>
                Home
            </MenuItem>
            {pages.map((page) => (
                <MenuItem
                    isActive={isActiveMenuItem(page.author_relative_url)}
                    url={page.author_relative_url}
                    key={page.id}
                >
                    {page.title}
                </MenuItem>
            ))}
            {author.credentials.length > 0 && (
                <MenuItem
                    url={`${author.url}/tip`}
                    isActive={isActiveMenuItem(`${author.url}/tip`)}
                >
                    Thank
                </MenuItem>
            )}
            {author.guestbook_disabled || (
                <MenuItem
                    url={authorGuestbookEntriesUrl}
                    isActive={currentUrl.includes("guestbook")}
                >
                    Guestbook
                </MenuItem>
            )}
            {!author.newsletter_disabled && (
                <MenuItem
                    url={`${author.url}/subscribe`}
                    isActive={isSubscribeMenuItemActive()}
                >
                    Subscribe
                </MenuItem>
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
