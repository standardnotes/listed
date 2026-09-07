import React from "react";
import "./SunsettingBanner.scss";

const SunsettingBanner = () => (
    <div className="sunsetting-banner" role="status">
        <p className="p2 sunsetting-banner__message">
            Note: The Listed platform will permanently shut down December 31, 2026.
            Your data published on Listed will still be available in your personal Standard Notes account.{" "}
            <a
                className="sunsetting-banner__link"
                target="_blank"
                rel="noreferrer noopener"
                href="https://listed.to/@Listed/76799/an-update-about-listed"
            >
                Learn more
            </a>
        </p>
    </div>
);

export default SunsettingBanner;
