import PropTypes from "prop-types";
import React from "react";
import SVG from "react-inlinesvg";
import StartWriting from "../../shared/StartWriting";
import { IcStarCircleFilled, IcTextRich, IcArrowLong } from "../../../assets/icons";
import "./ActiveAuthorItem.scss";

const ActiveAuthorItem = ({ author }) => (
    <li className="author active-author">
        {author.id === "easter-egg" ? (
            <StartWriting className="card">
                <div className="active-author__title">
                    <h5 className="h5">
                        {author.title}
                    </h5>
                </div>
                <p className="bio active-author__bio p2">{author.bio}</p>
                <div className="easter-egg__sign-up">
                    <p className="p3">
                        Sign up for Listed
                    </p>
                    <SVG src={IcArrowLong} className="easter-egg__icon--arrow" />
                </div>
            </StartWriting>
        ) : (
            <div className="card">
                <a href={author.url} data-turbolinks="false">
                    <div className="active-author__title">
                        <h5 className="h5">
                            {author.title}
                        </h5>
                        {author.featured
                                && <SVG src={IcStarCircleFilled} className="active-author__icon active-author__icon--featured" />}
                    </div>
                    {author.bio
                            && <p className="bio active-author__bio p2">{author.bio}</p>}
                    <div className="active-author__word-count">
                        <SVG src={IcTextRich} className="active-author__icon active-author__icon--word-count" />
                        <p className="p3 active-author__word-count" suppressHydrationWarning>
                            {`${(author.last_word_count || 0).toLocaleString()} words`}
                        </p>
                    </div>
                </a>
            </div>
        )}
    </li>
);

ActiveAuthorItem.propTypes = {
    author: PropTypes.shape({
        bio: PropTypes.string,
        featured: PropTypes.bool.isRequired,
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired,
        title: PropTypes.string.isRequired,
        url: PropTypes.string,
        last_word_count: PropTypes.number,
    }).isRequired,
};

export default ActiveAuthorItem;
