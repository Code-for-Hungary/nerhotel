import styles from "./ControlsTooltip.module.css";
import "./ControlsTooltip.transition.css";

/**
 * Re-creation of Leaflet's internal tooltip (using it's global CSS)
 * but intended to be used on the controls.
 */
export const ControlsTooltip = ({ message, ref, ...props }) => {
    return (
        <div className={`leaflet-tooltip leaflet-tooltip-left ${styles.controlsTooltip}`} {...props} ref={ref}>
            {message}
        </div>
    );
};
