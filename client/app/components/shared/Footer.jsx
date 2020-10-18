import React from "react";
import "./Footer.scss";

const Footer = ({ blogPageFooter }) => {
    return (
        <div id="footer" className={blogPageFooter ? "footer--blog-page" : ""}>
            <div className="footer__container">
                <p className="p3">Listed Blogging Platform</p>
                <p className="p3">Copyright Ⓒ 2020</p>
                <p className="p3">By Standard Notes</p>
            </div>
        </div>
    );
};

export default Footer;
