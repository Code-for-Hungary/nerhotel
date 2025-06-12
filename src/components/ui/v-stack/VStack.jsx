import styles from "./VStack.module.css";

export function VStack({ children, className, ...props }) {
    return (
        <div className={`${styles.VStack} ${className}`} {...props}>
            {children}
        </div>
    );
}
