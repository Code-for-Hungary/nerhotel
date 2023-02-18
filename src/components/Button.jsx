import { SmartLink } from "./SmartLink";
import styles from "../css/button.module.css";

function Button({ to, className, isFull, children, ...props }) {
    const fullWidthClassName = isFull ? styles.fullWidth : "";
    const classNames = `${styles.button} ${fullWidthClassName} ${className ? className : ""}`;

    if (to) {
        return (
            <SmartLink to={to} className={classNames} {...props}>
                {children}
            </SmartLink>
        );
    }

    return (
        <button className={classNames} {...props}>
            {children}
        </button>
    );
}

export default Button;
