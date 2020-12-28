import React from "react";
import "./AuthorMenu.scss";

const AuthorMenu = ({ isMobileMenuOpen, isDesktopMenu, author, pages, authorGuestbookEntriesUrl, currentUrl }) => {
    const isActiveMenuItem = url => url === currentUrl;

    const isSubscribeMenuItemActive = () => (
        isActiveMenuItem(`${author.url}/subscribe`) || currentUrl.includes("subscriptions")
    );

    const navClassName = () => {
        if (isDesktopMenu) {
            return "pages-menu author-pages-menu--desktop pages-menu--desktop";
        }

        return `pages-menu--mobile ${isMobileMenuOpen ? "pages-menu--mobile-visible" : ""}`;
    }

    return(
        <nav className={navClassName()}>
            <a
                href={author.url}
                className={`button page-link ${isActiveMenuItem(author.url) ? "button--active" : "button--no-fill"}`}
            >
                Home
            </a>
            {pages.map(page => (
                <a 
                    key={page.id}
                    href={page.author_relative_url}
                    className={`button page-link ${isActiveMenuItem(page.author_relative_url) ? "button--active" : "button--no-fill"}`}
                >
                    {page.title}
                </a>
            ))}
            {author.credentials.length > 0 && (
                <a
                    href={`${author.url}/tip`}
                    className={`button page-link ${isActiveMenuItem(`${author.url}/tip`) ? "button--active" : "button--no-fill"}`}
                >
                    Thank
                </a>
            )}
            {author.guestbook_disabled || (
                <a
                    href={authorGuestbookEntriesUrl}
                    className={`button page-link ${currentUrl.includes("guestbook") ? "button--active" : "button--no-fill"}`}
                >
                    Guestbook
                </a>
            )}
            {!author.newsletter_disabled && (
                <a
                    href={`${author.url}/subscribe`}
                    className={`button page-link ${isSubscribeMenuItemActive() ? "button--active" : "button--no-fill"}`}
                >
                    Subscribe
                </a>
            )}
        </nav>
    );
};

export default AuthorMenu;
