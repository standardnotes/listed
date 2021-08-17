import PropTypes from "prop-types";
import React from "react";
import "./Footer.scss";

const Footer = ({ blogPage, author, privatePost }) => (
    <div id="footer" className={blogPage ? "footer--blog-page" : "footer"}>
        <div className="footer__container">
            <p className="p3">Listed Blogging Platform</p>
            <p className="p3">
                Copyright ©
                {" "}
                {(new Date()).getFullYear()}
                {" "}
                {(author && !privatePost) && author.title}
            </p>
            <p className="p3">
                Via
                {" "}
                <a href="https://standardnotes.com" target="_blank" rel="noopener noreferrer">
                    Standard Notes
                </a>
            </p>
        </div>
    </div>
);

Footer.propTypes = {
    author: PropTypes.shape({
        title: PropTypes.string.isRequired,
    }),
    blogPage: PropTypes.bool,
    privatePost: PropTypes.bool,
};

Footer.defaultProps = {
    author: null,
    blogPage: false,
    privatePost: false,
};

export default (props) => <Footer {...props} />;
