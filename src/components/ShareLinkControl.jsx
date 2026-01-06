import styles from "./ShareLinkControl.module.css";
import listStyles from "../css/map-list-opener.module.css";
import Icon from "./ui/Icon";
import linkIcon from "../assets/link-icon.svg";

function ShareLinkControl({ shareLink }) {
    return (
        <button className={`${listStyles.controlButton} ${styles.shareButton}`} onClick={shareLink}>
            <Icon img={linkIcon} />
        </button>
    );
}

export default ShareLinkControl;
