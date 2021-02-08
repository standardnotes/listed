import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import SVG from "react-inlinesvg";
import "./NavBar.scss";

const NavBar = ({ sections }) => {
    const [activeNavItem, setActiveNavItem] = useState(sections[0].id);

    const clickNavItem = (event, id) => {
        document.getElementById(id).scrollIntoView({ behavior: "smooth" });
        setActiveNavItem(id);
    };

    const updateActiveSection = () => {
        for (let i = 0; i < sections.length; i += 1) {
            const { id } = sections[i];
            const sectionElement = document.getElementById(id);
            const { top: sectionTopPosition } = sectionElement.getBoundingClientRect();

            if (sectionTopPosition >= 0) {
                setActiveNavItem(id);
                break;
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", updateActiveSection);
        return () => window.removeEventListener("scroll", updateActiveSection);
    }, []);

    return (
        <nav className="left-nav-bar">
            {sections.map(({ id, title, icon }) => (
                <button
                    key={id}
                    onClick={(e) => clickNavItem(e, id)}
                    className={`button ${id === activeNavItem ? "button--active" : "button--no-fill"}`}
                    type="button"
                    data-turbolinks="false"
                >
                    <SVG src={icon} alt={title} className="left-nav-bar__icon" />
                    {title}
                </button>
            ))}
        </nav>
    );
};

NavBar.propTypes = {
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            icon: PropTypes.node.isRequired,
        }),
    ).isRequired,
};

export default NavBar;
