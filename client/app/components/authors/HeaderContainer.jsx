import PropTypes from "prop-types";
import React, { useState } from "react";
import SVG from "react-inlinesvg";
import { IcListed, IcMenu, IcClose } from "../../assets/icons";
import { MenuContainer, AuthorInfo } from "./header";
import "./HeaderContainer.scss";
import MenuItem from "./header/menu/MenuItem";

const HeaderContainer = ({
    homeUrl,
    author,
    post,
    privatePost,
    pages,
    authorGuestbookEntriesUrl,
    currentUrl,
    blogPage,
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const renderMenu = (isDesktopMenu) => (
        <MenuContainer
            isMobileMenuOpen={isMobileMenuOpen}
            isDesktopMenu={isDesktopMenu}
            author={author}
            pages={pages}
            authorGuestbookEntriesUrl={authorGuestbookEntriesUrl}
            currentUrl={currentUrl}
        />
    );

    return (
        <div className={`page-header__container ${post ? "page-header__container--post" : ""}`}>
            <div id="page-header">
                <div className="left">
                    <div className="listed-logo-link">
                        <MenuItem url={homeUrl} isLeftItem>
                            <div className="listed-logo__container">
                                <SVG src={IcListed} className="listed-logo" />
                            </div>
                        </MenuItem>
                    </div>
                    {author && !privatePost && (
                        <div className="author-name__container">
                            <MenuItem url={author.url} isLeftItem>
                                <div className="h4 author-name path-item">
                                    {author.title}
                                </div>
                            </MenuItem>
                        </div>
                    )}
                </div>
                <div className="right">
                    <button
                        className="button button--menu-icon"
                        aria-label="Menu"
                        aria-controls="navigation"
                        type="button"
                    >
                        {isMobileMenuOpen
                            ? <SVG src={IcClose} onClick={() => setIsMobileMenuOpen(false)} />
                            : <SVG src={IcMenu} onClick={() => setIsMobileMenuOpen(true)} />}
                    </button>
                    {renderMenu(true)}
                </div>
            </div>
            {renderMenu(false)}
            {blogPage && (
                <AuthorInfo author={author} />
            )}
        </div>
    );
};

HeaderContainer.propTypes = {
    author: PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    }),
    authorGuestbookEntriesUrl: PropTypes.string,
    blogPage: PropTypes.bool,
    currentUrl: PropTypes.string.isRequired,
    homeUrl: PropTypes.string.isRequired,
    pages: PropTypes.arrayOf(
        PropTypes.shape({}),
    ),
    post: PropTypes.bool.isRequired,
    privatePost: PropTypes.bool,
};

HeaderContainer.defaultProps = {
    author: null,
    authorGuestbookEntriesUrl: null,
    blogPage: false,
    pages: null,
    privatePost: false,
};

export default (props) => <HeaderContainer {...props} />;
