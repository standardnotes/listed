import PropTypes from "prop-types";
import React from "react";
import { HomepageMenu, AuthorMenu } from "./menu";
import "./MenuContainer.scss";

const MenuContainer = ({
    isMobileMenuOpen,
    isDesktopMenu,
    author,
    pages,
    privatePost,
    currentUrl,
}) => (
    <div className="pages-menu__container">
        {!author && !privatePost && (
            <HomepageMenu isMobileMenuOpen={isMobileMenuOpen} isDesktopMenu={isDesktopMenu} />
        )}
        {author && !privatePost && (
            <AuthorMenu
                isMobileMenuOpen={isMobileMenuOpen}
                isDesktopMenu={isDesktopMenu}
                author={author}
                pages={pages}
                currentUrl={currentUrl}
            />
        )}
    </div>
);

MenuContainer.propTypes = {
    author: PropTypes.shape({}),
    currentUrl: PropTypes.string.isRequired,
    isDesktopMenu: PropTypes.bool.isRequired,
    isMobileMenuOpen: PropTypes.bool.isRequired,
    pages: PropTypes.arrayOf(
        PropTypes.shape({}),
    ),
    privatePost: PropTypes.bool,
};

MenuContainer.defaultProps = {
    author: null,
    pages: null,
    privatePost: false,
};

export default MenuContainer;
