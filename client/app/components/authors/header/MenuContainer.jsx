import React from "react";
import { HomepageMenu, AuthorMenu } from "./menu";
import "./MenuContainer.scss";

const MenuContainer = ({ isMobileMenuOpen, isDesktopMenu, author, pages, privatePost, authorGuestbookEntriesUrl, currentPath }) => {
    return(
        <div className="pages-menu__container">
            {!author && (
                <HomepageMenu isMobileMenuOpen={isMobileMenuOpen} isDesktopMenu={isDesktopMenu} />
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
};

export default MenuContainer;
