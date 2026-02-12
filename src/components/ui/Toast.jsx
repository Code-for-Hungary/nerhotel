import { forwardRef } from "react";

import styles from "./Toast.module.css";
import "./Toast.transition.css";

const Toast = forwardRef(({ message, ...props }, ref) => {
    return (
        <div className={styles.toast} {...props} ref={ref}>
            {message}
        </div>
    );
});

export default Toast;
