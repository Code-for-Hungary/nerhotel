import styles from "./Toast.module.css";
import "./Toast.transition.css";

const Toast = ({ message, ref, ...props }) => {
    return (
        <div className={styles.toast} {...props} ref={ref}>
            {message}
        </div>
    );
};

export default Toast;
