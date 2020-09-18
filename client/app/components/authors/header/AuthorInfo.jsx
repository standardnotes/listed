import React from "react";
import SVG from "react-inlinesvg";
import { IcArrowLong } from "../../../assets/icons";
import "./AuthorInfo.scss";

const AuthorInfo = ({ author }) => {
    return(
        <div className="header-author-info">
            <div className="header-author-info__items">
                <div className="header-image-container">
                    {author.header_image_url ? (
                        <div style={ { backgroundImage: `url(${author.header_image_url})` } } className="header-image"></div>
                    ) : (
                        <p className="header-author-capital">
                            {author.title[0]}
                        </p>
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
                                    rel="noopener noreferrer"
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
                                    rel="noopener noreferrer"
                                    className="p2 link author-link"
                                >
                                    {author.link}
                                </a>
                            </span>
                        )}
                    </p>
                </div>
            </div>
            <button className="word-count__button">
                <p className="p3 word-count" suppressHydrationWarning>
                    {author.word_count.toLocaleString()} words
                </p>
                <SVG src={IcArrowLong} alt="Down arrow" className="word-count__icon" />
            </button>
        </div>      
    );
};

export default AuthorInfo;
