import React, { useEffect } from "react";

export const useCaptcha = (captchaURL, callback) => {
    useEffect(() => {
        function handleCaptchaEvent(event) {
            if (!captchaURL) {
                return;
            }

            if (event.origin !== new URL(captchaURL).origin) {
                return;
            }

            if (event?.data?.type?.includes("captcha")) {
                callback(event.data.token);
            }
        }

        window.addEventListener("message", handleCaptchaEvent);

        return () => {
            window.removeEventListener("message", handleCaptchaEvent);
        };
    }, [captchaURL, callback]);

    if (!captchaURL) {
        return null;
    }

    return (
        <iframe
            title="Human verification"
            src={captchaURL}
            height={480}
            width="100%"
            style={{ border: "none", backgroundColor: "transparent" }}
        />
    );
};
