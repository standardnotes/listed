import React from "react";
import "./Menu.scss";

const Menu = ({ isMobileMenuOpen, isDesktopMenu }) => {
    const navClassName = () => {
        if (isDesktopMenu) {
            return "pages-menu--desktop";
        }

        return `pages-menu--mobile ${isMobileMenuOpen ? "pages-menu--mobile-visible" : ""}`;
    }

    return(
        <nav className={navClassName()}>
            <a
                href="https://listed.to/@Listed/5063/what-will-you-write-about"
                target="_blank"
                rel="noreferrer"
                className="button button--no-fill"
            >
                About Listed
            </a>
            <a
                href="https://listed.to/@Listed/5202/100-day-writing-challenge"
                target="_blank"
                rel="noreferrer"
                className="button button--no-fill"
            >
                100 Day Writing Challenge
            </a>
            <button className="button button--primary">
                Start writing
            </button>
        </nav>
    );
};

export default Menu;
