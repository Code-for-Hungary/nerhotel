import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import styles from "../../css/map-list-opener.module.css";
import Icon from "../ui/Icon";
import myLocationIcon from "../../assets/my-location.svg";
import { ControlsTooltip } from "./ControlsTooltip";

function LocateControl({ setMapToUsersLocation, label }) {
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipRef = useRef(null);

    return (
        <div className="relative">
            <button
                aria-label={label}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className={`${styles.controlButton} ${styles.locateButton}`}
                onClick={setMapToUsersLocation}
            >
                <Icon img={myLocationIcon} />
            </button>
            <CSSTransition mountOnEnter unmountOnExit in={showTooltip} classNames="ControlsTooltip" timeout={200} nodeRef={tooltipRef}>
                <ControlsTooltip message={label} ref={tooltipRef} />
            </CSSTransition>
        </div>
    );
}

export default LocateControl;
