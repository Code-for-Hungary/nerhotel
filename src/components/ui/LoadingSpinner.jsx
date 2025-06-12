import styles from "./LoadingSpinner.module.css";

function LoadingSpinner({ size = "40px", color = "var(--nh-accent-color)", className, ...props }) {
    return (
        <div
            className={`${styles.spinner} ${className || ""}`}
            style={{
                "--spinner-size": size,
                "--spinner-color": color,
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
