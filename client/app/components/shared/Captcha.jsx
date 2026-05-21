import PropTypes from "prop-types";
import React, { useCallback, useEffect } from "react";
import { useCaptcha } from "../../hooks/useCaptcha";
import "./Captcha.scss";

const Captcha = ({ captchaUIUrl, onVerify, resetKey }) => {
    const handleVerify = useCallback(
        (token) => {
            onVerify(token);
        },
        [onVerify],
    );

    useEffect(() => {
        if (!captchaUIUrl) {
            onVerify("");
        }
    }, [captchaUIUrl, onVerify]);

    const captchaIframe = useCaptcha(captchaUIUrl, handleVerify);

    if (!captchaUIUrl) {
        return null;
    }

    return (
        <div className="captcha" key={resetKey}>
            {captchaIframe}
        </div>
    );
};

Captcha.propTypes = {
    captchaUIUrl: PropTypes.string,
    onVerify: PropTypes.func.isRequired,
    resetKey: PropTypes.number,
};

Captcha.defaultProps = {
    captchaUIUrl: "",
    resetKey: 0,
};

export default Captcha;
