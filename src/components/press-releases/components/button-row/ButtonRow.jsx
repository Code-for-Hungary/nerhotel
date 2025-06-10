import styles from "./ButtonRow.module.css";

export function ButtonRow({ children, className, ...props }) {
    return (
        <div className={`${styles.ButtonRow} ${className || ""}`} {...props}>
            {children}
        </div>
    );
}
