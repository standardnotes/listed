import React from "react";
import SVG from "react-inlinesvg";
import { IcStarCircleFilled, IcTextRich } from "../../../assets/icons";
import "./ActiveAuthorItem.scss";

const ActiveAuthorItem = ({ author }) => {
    return(
        <a className="author active-author" href={author.url}>
            <div className="active-author__title">
                <h5 className="h5">
                    {author.title}
                </h5>
                {author.featured && 
                    <SVG src={IcStarCircleFilled} alt="Featured icon" className="active-author__icon active-author__icon--featured" />
                }
            </div>
            {author.bio &&
                <p className="bio active-author__bio p2">{author.bio}</p>
            }
            <div className="active-author__word-count">
                <SVG src={IcTextRich} alt="Word count icon" className="active-author__icon active-author__icon--word-count" />
                <p className="p3" suppressHydrationWarning>
                    {`${author.word_count.toLocaleString()} words`}
                </p>
            </div>
        </a>
    );
};

export default ActiveAuthorItem;
