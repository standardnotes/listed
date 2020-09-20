import React from "react";
import "./Section.scss";

const Section = ({ section }) => {
    const { id, title } = section;

    return(
        <div id={id} className="card section">
            <h3 className="h3">
                {title}
            </h3>
        </div>
    );
};

export default Section;
