import React from "react";
import MasonryLayout from "./MasonryLayout";
import ActiveAuthorItem from "./ActiveAuthorItem";
import "./ActiveAuthors.scss";

const ActiveAuthors = ({ activeAuthors }) => {
    return(
        <div className="active-authors">
            <div className="active-authors__headline">
                <h3 className="h3">Listed authors</h3>
                <div className="active-authors__headline-separator"></div>
            </div>
            <MasonryLayout>
                {activeAuthors.map(author =>
                    <ActiveAuthorItem key={author.id} author={author} />
                )}
            </MasonryLayout>
            <div className="active-authors--mobile">
                {activeAuthors.map(author =>
                    <ActiveAuthorItem key={author.id} author={author} />
                )}
            </div>
        </div>
    );
};

export default ActiveAuthors;
