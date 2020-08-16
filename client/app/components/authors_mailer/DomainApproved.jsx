import React from "react";

export default ({ url }) => {
    return (
        <div>
            <h3>
                Congratulations!{" "}
                <span aria-role="img" aria-label="party-popper">🎉</span>
            </h3>
            <p>
                Your custom domain has been approved, and your blog is now live at{" "}
                <a href={url}>{url}</a>.
            </p>
            <p>
                Any questions? Please feel free to reply directly to this email.
            </p>
        </div>
    );
};
