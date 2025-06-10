import { SmartLink } from "../SmartLink";
import styles from "./Button.module.css";

function Button({ to, className, isFull, children, isPlainAnchor, loading, ...props }) {
    const fullWidthClassName = isFull ? styles.fullWidth : "";
    const loadingClassName = loading ? styles.loading : "";
    const classNames = `${styles.button} ${fullWidthClassName} ${loadingClassName} ${className ? className : ""}`;

    if (to) {
        return (
            <SmartLink to={to} className={classNames} {...props}>
                {children}
            </SmartLink>
        );
    }

    if (to && isPlainAnchor) {
        return (
            <a href={to} className={classNames} {...props}>
                {children}
            </a>
        );
    }

    return (
        <button className={classNames} {...props}>
            {children}
        </button>
    );
}

export default Button;
