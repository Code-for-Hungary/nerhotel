import styles from "./Toast.module.css";

function Toast({ message }) {
    return <div className={styles.toast}>{message}</div>;
}

export default Toast;
