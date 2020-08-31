import React, { useState } from "react";
import PropTypes from 'prop-types';
import { IcListed, IcMenu, IcClose } from "../../assets/icons";
import Menu from "./header/Menu";
import AuthorMenu from "./header/AuthorMenu";
import AuthorInfo from "./header/AuthorInfo";
import "./Header.scss";

const Header = ({ homeUrl, post, author, privatePost, pages, authorGuestbookEntriesUrl, currentPath }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const renderMenu = isDesktopMenu => (
        <div className="pages-menu__container">
            {!author && (
                <Menu isMobileMenuOpen={isMobileMenuOpen} isDesktopMenu={isDesktopMenu} />
            )}
            {pages && !privatePost && (
                <AuthorMenu
                    isMobileMenuOpen={isMobileMenuOpen}
                    isDesktopMenu={isDesktopMenu}
                    author={author}
                    pages={pages}
                    authorGuestbookEntriesUrl={authorGuestbookEntriesUrl}
                    currentPath={currentPath}
                />
            )}
        </div>
    );

    return (
        <div className="page-header__container">
            <div id="page-header">
                <div className="left">
                    <div className="website-name">
                        <a href={homeUrl} className="listed-logo-link">
                            <img src={IcListed} alt="Listed logo" className="listed-logo" />
                        </a>
                    </div>
                    {author && !privatePost && (
                        <div className="author-name__container">
                            <div className="h4 author-name path-item">
                                {author.title}
                            </div>
                        </div>
                    )}
                    {post && post.page && (
                        <div className="author-name path-item">
                            <a href={post.author_relative_url}>{post.title}</a>
                        </div>
                    )}
                </div>
                <div className="right">
                    <button className="button button--menu-icon" aria-label="Menu" aria-controls="navigation">
                        {isMobileMenuOpen 
                            ? <img src={IcClose} alt="Close menu icon" onClick={() => setIsMobileMenuOpen(false)} />
                            : <img src={IcMenu} alt="Open menu icon" onClick={() => setIsMobileMenuOpen(true)} />
                        }
                    </button>
                    {renderMenu(true)}
                </div>
            </div>
            {renderMenu(false)}
            {author && !post && (
                <AuthorInfo author={author} />
            )}
        </div>
    );
};

export default props => <Header {...props} />;
