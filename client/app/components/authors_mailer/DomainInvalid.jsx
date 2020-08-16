import React from "react";

export default () => {
    return (
        <div>
            <p>
                Hi there, your Listed domain settings were not configured properly.
                Please make sure you have an A record pointing to
                <strong> 18.205.249.107</strong>,
                then
                <strong> submit your domain request again via your author settings</strong>.
                You'll know you have it configured correctly if when you visit your custom domain, it shows an
                <i> Invalid Certificate error</i>.
            </p>
            <p>
                Any questions? Please feel free to reply directly to this email.
            </p>
        </div>
    );
};
