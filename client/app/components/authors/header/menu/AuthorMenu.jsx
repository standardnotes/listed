import React from "react";
import "./AuthorMenu.scss";

const AuthorMenu = ({ isMobileMenuOpen, isDesktopMenu, author, pages, authorGuestbookEntriesUrl, currentPath }) => {
    const isActiveMenuItem = path => path === currentPath;

    const navClassName = () => {
        if (isDesktopMenu) {
            return "pages-menu author-pages-menu--desktop pages-menu--desktop";
        }

        return `pages-menu--mobile ${isMobileMenuOpen ? "pages-menu--mobile-visible" : ""}`;
    }

    return(
        <nav className={navClassName()}>
            <a
                href={`/${author.url_segment}`}
                className={`button page-link ${isActiveMenuItem(`/${author.url_segment}`) ? "button--active" : "button--no-fill"}`}
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
                    className={`button page-link ${isActiveMenuItem(authorGuestbookEntriesUrl) ? "button--active" : "button--no-fill"}`}
                >
                    Guestbook
                </a>
            )}
            {!author.newsletter_disabled && (
                <a
                    href={`${author.url}/subscribe`}
                    className={`button page-link ${isActiveMenuItem(`${author.url}/subscribe`) ? "button--active" : "button--no-fill"}`}
                >
                    Subscribe
                </a>
            )}
        </nav>
    );
};

export default AuthorMenu;
