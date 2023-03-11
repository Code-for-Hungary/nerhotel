import { SmartLink } from "../SmartLink";
import styles from "./Button.module.css";

function Button({ to, className, isFull, children, isPlainAnchor, ...props }) {
    const fullWidthClassName = isFull ? styles.fullWidth : "";
    const classNames = `${styles.button} ${fullWidthClassName} ${className ? className : ""}`;

    if (to) {
        return (
            <SmartLink to={to} className={classNames} {...props}>
                {children}
            </SmartLink>
        );
    }

    if (isPlainAnchor) {
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
