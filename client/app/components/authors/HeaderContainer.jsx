import React, { useState } from "react";
import SVG from "react-inlinesvg";
import { IcListed, IcMenu, IcClose } from "../../assets/icons";
import { MenuContainer, AuthorInfo } from "./header";
import "./HeaderContainer.scss";

const HeaderContainer = ({ homeUrl, author, post, privatePost, pages, authorGuestbookEntriesUrl, currentPath }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const renderMenu = isDesktopMenu => (
        <MenuContainer
            isMobileMenuOpen={isMobileMenuOpen}
            isDesktopMenu={isDesktopMenu}
            author={author}
            pages={pages}
            authorGuestbookEntriesUrl={authorGuestbookEntriesUrl}
            currentPath={currentPath}
        />
    );

    return (
        <div className="page-header__container">
            <div id="page-header">
                <div className="left">
                    <div className="website-name">
                        <a href={homeUrl} className="listed-logo-link">
                            <SVG src={IcListed} className="listed-logo" />
                        </a>
                    </div>
                    {author && !privatePost && (
                        <div className="author-name__container">
                            <div className="h4 author-name path-item">
                                {author.title}
                            </div>
                        </div>
                    )}
                </div>
                <div className="right">
                    <button className="button button--menu-icon" aria-label="Menu" aria-controls="navigation">
                        {isMobileMenuOpen 
                            ? <SVG src={IcClose} onClick={() => setIsMobileMenuOpen(false)} />
                            : <SVG src={IcMenu} onClick={() => setIsMobileMenuOpen(true)} />
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

export default props => <HeaderContainer {...props} />;
