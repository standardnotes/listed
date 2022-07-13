import React from "react";
import PropTypes from "prop-types";
import StartWriting from "../../../shared/StartWriting";

const HomepageMenu = ({ isMobileMenuOpen, isDesktopMenu }) => {
    const navClassName = () => {
        if (isDesktopMenu) {
            return "pages-menu pages-menu--desktop";
        }

        return `pages-menu pages-menu--mobile ${isMobileMenuOpen ? "pages-menu--mobile-visible" : ""}`;
    };

    return (
        <nav className={navClassName()}>
            <a
                href="https://listed.to/@Listed/5063/what-will-you-write-about"
                rel="noreferrer"
                className="button button--no-fill"
            >
                About Listed
            </a>
            <a
                href="https://listed.to/@Listed/5202/100-day-writing-challenge"
                rel="noreferrer"
                className="button button--no-fill"
            >
                100 Day Writing Challenge
            </a>
            <StartWriting />
        </nav>
    );
};

HomepageMenu.propTypes = {
    isMobileMenuOpen: PropTypes.bool.isRequired,
    isDesktopMenu: PropTypes.bool.isRequired,
};

export default HomepageMenu;
