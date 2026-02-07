import styles from "./Controls.module.css";

export function Controls({ children, ...props }) {
    return (
        <div className={styles.controls} {...props} id="map-controls">
            {children}
        </div>
    );
}
