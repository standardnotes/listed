import React from "react";
import "./GettingStarted.scss";

const GettingStarted = () => {
    return (
        <div>
            <ol className="getting-started__list">
                <li className="p2">
                    <strong>Open the Standard Notes </strong>
                    <a href="https://app.standardnotes.com" target="_blank" rel="noopener noreferrer">
                        web app
                    </a>{" "}
                    or desktop app.
                </li>
                <li className="p2">
                    <strong>Click the Preferences icon</strong> in the lower left corner of the app.
                </li>
                <li className="p2">
                    <strong>Open the Listed</strong> section.
                </li>
                <li className="p2">
                    Select
                    <strong> Create new author</strong>
                    {". "}
                    If you do not see this option, first register for a free Standard Notes account.
                </li>
            </ol>
            <p className="p2">That&apos;s it! Your public journal is now live and ready to go! 👏</p>
        </div>
    );
};

export default GettingStarted;
