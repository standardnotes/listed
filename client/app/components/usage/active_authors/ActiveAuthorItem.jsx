import React from "react";
import SVG from "react-inlinesvg";
import { IcStarCircleFilled, IcTextRich, IcArrowLong } from "../../../assets/icons";
import "./ActiveAuthorItem.scss";

const ActiveAuthorItem = ({ author }) => {
    return(
        <div className="card author active-author">
            <a href={author.url}>
                <div className="active-author__title">
                    <h5 className="h5">
                        {author.title}
                    </h5>
                    {author.featured && 
                        <SVG src={IcStarCircleFilled} className="active-author__icon active-author__icon--featured" />
                    }
                </div>
                {author.bio &&
                    <p className="bio active-author__bio p2">{author.bio}</p>
                }
                {author.easterEgg ? (
                    <div className="easter-egg__sign-up">
                        <p className="p3">
                            Sign up for Listed
                        </p>
                        <SVG src={IcArrowLong} className="easter-egg__icon--arrow" />
                    </div>
                ) : (
                    <div className="active-author__word-count">
                        <SVG src={IcTextRich} className="active-author__icon active-author__icon--word-count" />
                        <p className="p3 active-author__word-count" suppressHydrationWarning>
                            {`${author.word_count.toLocaleString()} words`}
                        </p>
                    </div>
                )}
            </a>
        </div>
    );
};

export default ActiveAuthorItem;
