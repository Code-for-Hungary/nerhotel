import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import Icon from "../ui/Icon";
import listIcon from "../../assets/list-icon.svg";
import styles from "../../css/map-list-opener.module.css";
import { ControlsTooltip } from "./ControlsTooltip";

import { canHover } from "../../utils/can-hover";

function MapListOpener({ onLocationListOpen, label }) {
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipRef = useRef(null);

    const handleMouseEnter = () => {
        if (canHover()) {
            setShowTooltip(true);
        }
    };

    return (
        <div className="relative">
            <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setShowTooltip(false)}
                aria-label={label}
                className={`${styles.controlButton} ${styles.listButton}`}
                onClick={onLocationListOpen}
            >
                <Icon img={listIcon} size="small" />
            </button>
            <CSSTransition mountOnEnter unmountOnExit in={showTooltip} classNames="ControlsTooltip" timeout={200} nodeRef={tooltipRef}>
                <ControlsTooltip message={label} ref={tooltipRef} />
            </CSSTransition>
        </div>
    );
}

export default MapListOpener;
