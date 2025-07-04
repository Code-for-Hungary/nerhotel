import styles from "./ShareLinkControl.module.css";
import Icon from "./ui/Icon";
import linkIcon from "../assets/link-icon.svg";

function ShareLinkControl({ shareLink }) {
    return (
        <button className={`${styles.controlButton} ${styles.shareButton}`} onClick={shareLink}>
            <Icon img={linkIcon} />
        </button>
    );
}

export default ShareLinkControl;
