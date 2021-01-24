import React from "react";

export default ({ author, verificationLink }) => (
    <div>
        <h3>
            Hey
            {author.display_name}
            ,
        </h3>
        <p>
            Please verify your email address by clicking the link below.
        </p>
        <a href={verificationLink}>{verificationLink}</a>
    </div>
);
