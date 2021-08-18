import PropTypes from "prop-types";
import React, { useState } from "react";
import SVG from "react-inlinesvg";
import { IcListed, IcMenu, IcClose } from "../../assets/icons";
import { MenuContainer, AuthorInfo } from "./header";
import { shouldShowAuthorMenu } from "../../helpers";
import "./HeaderContainer.scss";

const HeaderContainer = ({
    homeUrl,
    author,
    post,
    privatePost,
    pages,
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
            currentUrl={currentUrl}
            privatePost={privatePost}
        />
    );

    const shouldShowMenu = () => !author || shouldShowAuthorMenu(author, pages);

    return (
        <div className={`page-header__container ${post ? "page-header__container--post" : ""}`}>
            <div id="page-header">
                <div className="left">
                    <div className="website-name">
                        <a href={homeUrl} className="listed-logo-link button button--no-fill" aria-label="Listed logo">
                            <SVG
                                src={IcListed}
                                className="listed-logo listed-logo__animated"
                                loader={<img src={IcListed} className="listed-logo" alt="Listed Logo" />}
                            />
                        </a>
                    </div>
                    {author && !privatePost && (
                        <div className="author-name__container">
                            <div className="author-name path-item">
                                <a href={author.url} className="button button--no-fill">
                                    <div className="h4">
                                        {author.title}
                                    </div>
                                </a>
                            </div>
                        </div>
                    )}
                </div>
                { shouldShowMenu() && (
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
                )}
            </div>
            { shouldShowMenu() && renderMenu(false)}
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
    blogPage: false,
    pages: null,
    privatePost: false,
};

export default (props) => <HeaderContainer {...props} />;
