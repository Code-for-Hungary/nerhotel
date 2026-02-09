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

function ShareLinkControl({ shareLink, label }) {
    const [showToast, setShowToast] = useState(false);
    const toastRef = useRef(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipRef = useRef(null);

    const handleMouseEnter = () => {
        if (canHover()) {
            setShowTooltip(true);
        }
    };

    const handleClick = () => {
        shareLink();
        setShowToast(true);
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
