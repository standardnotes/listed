import React, { useState } from "react";
import { GettingStartedGif } from "../../../assets/gifs";
import "./GettingStarted.scss"

const GettingStarted = ({ secretUrl }) => {
    const [isCodeCopied, setIsCodeCopied] = useState(false);

    const copyCode = () => {
        const textFieldElement = document.querySelector(".getting-started__author-code .text-field");
        textFieldElement.focus();
        textFieldElement.select();
        document.execCommand('copy');
        textFieldElement.blur();
        setIsCodeCopied(true);
        setTimeout(() => {
            setIsCodeCopied(false);
        }, 2000);
    };

    return(
        <div>
            <ol className="getting-started__list">
                <li className="p2">
                    <strong>Copy the author code</strong> we’ve just generated for you:
                    <div className="getting-started__author-code">
                        <input defaultValue={secretUrl} className="text-field"></input>
                        <button className="button button--primary" onClick={copyCode}>
                            {isCodeCopied ? "Copied!" : "Copy to clipboard"}
                        </button>
                    </div>
                    <div className="callout--warning getting-started__callout">
                        After importing this code, you are advised to store it somewhere safe.
                    </div>
                </li>
                <li className="p2">
                    <strong>Open the </strong>
                    <a href="https://standardnotes.org" target="_blank" rel="noopener noreferrer"> 
                        Standard Notes
                    </a>
                    {" "}web or desktop app.
                </li>
                <li className="p2">
                    <strong>Click Extensions</strong> in the lower left corner of the app.
                </li>
                <li className="p2">
                    <strong>Paste your author code</strong> in the input box that appears, then press enter.
                    <img src={GettingStartedGif} className="new-author__gif" />
                </li>
            </ol>
            <p className="p2">
                That's it! Your public journal is now live and ready to go! 👏
            </p>
        </div>
    );
};

export default GettingStarted;
