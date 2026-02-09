import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import styles from "./ShareLinkControl.module.css";
import listStyles from "../../css/map-list-opener.module.css";
import Icon from "../ui/Icon";
import Toast from "../ui/Toast";
import shareIcon from "../../assets/share-icon.svg";
import { ControlsTooltip } from "./ControlsTooltip";

import { canHover } from "../../utils/can-hover";

import { isIOS, isAndroid } from "../../utils/platform-detection";
import { useTranslation } from "react-i18next";

function ShareLinkControl({ label }) {
    const [showToast, setShowToast] = useState(false);
    const toastRef = useRef(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipRef = useRef(null);
    const { i18n } = useTranslation();
    // apart from checking for the existence of the WebShare API we
    // want to make sure that this feature only activates on iOS and Android
    // because some desktop browsers (eg.: Safari on macOS) implement the WebShare API
    // but the experience is clunky and way worse then copy-to-clipboard
    // so we want to keep using a simple copy-to-clipboard flow on "desktop"
    const shouldUseNativeShare = navigator.share && (isAndroid() || isIOS());

    const doSharing = () => {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set("utm_source", "map_sharing_button");

        const url = `${window.location.origin}?${queryParams}`;

        if (shouldUseNativeShare) {
            navigator
                .share({
                    title: i18n.resolvedLanguage === "hu" ? "NERHotel" : "HotelOligarch",
                    url,
                })
                .catch((error) => console.error("Error sharing", error));
        } else {
            navigator.clipboard.writeText(url);
        }
    };

    const handleMouseEnter = () => {
        if (canHover()) {
            setShowTooltip(true);
        }
    };

    const handleClick = () => {
        doSharing();
        // No need for this toast when using the native share panel on mobile
        if (!shouldUseNativeShare) {
            setShowToast(true);
        }
    };

    useEffect(() => {
        let closeTimer;
        if (showToast) {
            closeTimer = setTimeout(() => setShowToast(false), 2000);
        }

        return () => clearTimeout(closeTimer);
    }, [showToast]);

    return (
        <div className="relative">
            <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setShowTooltip(false)}
                aria-label={label}
                className={`${listStyles.controlButton} ${styles.shareButton}`}
                onClick={handleClick}
            >
                <Icon img={shareIcon} />
            </button>
            {createPortal(
                <CSSTransition in={showToast} mountOnEnter unmountOnExit nodeRef={toastRef} classNames="Toast" timeout={200}>
                    <Toast message="A térképpont címe vágólapra lett másolva." onClick={() => setShowToast(false)} ref={toastRef} />
                </CSSTransition>,
                document.body
            )}
            <CSSTransition mountOnEnter unmountOnExit in={showTooltip} classNames="ControlsTooltip" timeout={200} nodeRef={tooltipRef}>
                <ControlsTooltip message={label} ref={tooltipRef} />
            </CSSTransition>
        </div>
    );
}

export default ShareLinkControl;
