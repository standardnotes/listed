import PropTypes from "prop-types";
import React, { useState, useRef } from "react";
import "./GettingStarted.scss";

const GettingStarted = ({ secretUrl }) => {
    const [isCodeCopied, setIsCodeCopied] = useState(false);
    const codeInputRef = useRef(null);

    const focusInput = (event) => {
        event.preventDefault();
        codeInputRef.current.focus();
    };

    const copyCode = (event) => {
        event.preventDefault();
        event.target.select();
        document.execCommand("copy");
        codeInputRef.current.blur();

        setIsCodeCopied(true);
        setTimeout(() => {
            setIsCodeCopied(false);
        }, 2000);
    };

    return (
        <div>
            <ol className="getting-started__list">
                <li className="p2">
                    <strong>Copy the author code</strong>
                    {" "}
                    we’ve just generated for you:
                    <div className="getting-started__author-code">
                        <input
                            ref={codeInputRef}
                            defaultValue={secretUrl}
                            className="text-field"
                            onFocus={copyCode}
                        />
                        <button className="button button--primary" type="button" onClick={focusInput}>
                            {isCodeCopied ? "Copied!" : "Copy to clipboard"}
                        </button>
                    </div>
                    <div className="callout callout--warning">
                        After importing this code, you are advised to store it somewhere safe.
                    </div>
                </li>
                <li className="p2">
                    <strong>Open the </strong>
                    <a href="https://app.standardnotes.com" target="_blank" rel="noopener noreferrer">
                        web app
                    </a>
                    {" "}
                    or desktop app.
                </li>
                <li className="p2">
                    <strong>Click the Preferences icon</strong>
                    {" "}
                    in the lower left corner of the app.
                </li>
                <li className="p2">
                    <strong>Open the General</strong>
                    {" "}
                    section and expand
                    {" "}
                    <strong>Advanced Settings.</strong>
                </li>
                <li className="p2">
                    <strong>Paste your author code</strong>
                    {" "}
                    in the
                    {" "}
                    <strong>Install Custom Extensions</strong>
                    {" "}
                    box, then press Enter
                    {" "}
                    on your keyboard, or click on the
                    {" "}
                    <strong>Install</strong>
                    {" "}
                    button.
                </li>
            </ol>
            <p className="p2">
                That&apos;s it! Your public journal is now live and ready to go! 👏
            </p>
        </div>
    );
};

GettingStarted.propTypes = {
    secretUrl: PropTypes.string.isRequired,
};

export default GettingStarted;
