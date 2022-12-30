import React from "react";
import styles from "../css/loading-spinner.module.css";

function LoadingSpinner({
    size = '40px',
    color = 'var(--nh-accent-color)',
    ...props
}) {
    return (
        <div className={styles.spinner} style={{
                '--spinner-size': size,
                '--spinner-color': color
            }}
            {...props}
        >
            <div className={styles.spinnerAnimationContainer}>
                <div />
            </div>
        </div>
    );
}

export default LoadingSpinner;