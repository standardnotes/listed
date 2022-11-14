import React from "react";
import PropTypes from "prop-types";
import SVG from "react-inlinesvg";
import { IcArrowLong } from "../../../assets/icons";
import "./AuthorInfo.scss";

const AuthorInfo = ({ author }) => {
    const scrollToPosts = () => {
        document.getElementById("author-posts").scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="header-author-info">
            <div className="header-author-info__items">
                <div className="header-image-container">
                    {author.header_image_url ? (
                        <div style={{ backgroundImage: `url(${author.header_image_url})` }} className="header-image" />
                    ) : (
                        <p className="header-author-capital">{author.title[0]}</p>
                    )}
                </div>
                <div>
                    <h1 className="h1">{author.title}</h1>
                    <p className="bio p1">{author.bio}</p>
                    <p className="p2 header-author-links">
                        {author.twitter && (
                            <span className="item">
                                <a
                                    href={`https://twitter.com/${author.twitter}`}
                                    target="_blank"
                                    rel="noopener nofollow"
                                    className="link author-twitter"
                                >
                                    {`@${author.twitter}`}
                                </a>
                            </span>
                        )}
                        {author.personal_link && (
                            <span className="item">
                                <a
                                    href={author.personal_link}
                                    target="_blank"
                                    rel="noopener nofollow"
                                    className="p2 link author-link"
                                >
                                    {author.link}
                                </a>
                            </span>
                        )}
                    </p>
                </div>
            </div>
            <button className="button word-count__button" type="button" onClick={scrollToPosts}>
                <p className="p3 word-count" suppressHydrationWarning>
                    {(author.last_word_count || 0).toLocaleString()} words
                </p>
                <SVG src={IcArrowLong} className="word-count__icon" />
            </button>
        </div>
    );
};

AuthorInfo.propTypes = {
    author: PropTypes.shape({
        bio: PropTypes.string,
        header_image_url: PropTypes.string,
        link: PropTypes.string,
        personal_link: PropTypes.string,
        title: PropTypes.string.isRequired,
        twitter: PropTypes.string,
        last_word_count: PropTypes.number,
    }).isRequired,
};

export default AuthorInfo;
