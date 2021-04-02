import React from "react";
import PropTypes from "prop-types";
import "./MenuItem.scss";

const MenuItem = ({
    url, isActive, children, isLeftItem,
}) => {
    const renderLink = () => (
        <a
            href={url}
            className={`button page-link ${isActive ? "button--active" : "button--no-fill"} ${isLeftItem ? "menu-item__left" : ""}`}
        >
            {children}
        </a>
    );
    if (isLeftItem) {
        return (
            <div className="menu-item">
                {renderLink()}
            </div>
        );
    }

    return renderLink();
};

MenuItem.propTypes = {
    url: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    isLeftItem: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

MenuItem.defaultProps = {
    isActive: false,
    isLeftItem: false,
};

export default MenuItem;
