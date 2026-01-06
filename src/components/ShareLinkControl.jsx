import styles from "./ShareLinkControl.module.css";
import listStyles from "../css/map-list-opener.module.css";
import Icon from "./ui/Icon";
import shareIcon from "../assets/share-icon.svg";

function ShareLinkControl({ shareLink }) {
    return (
        <button className={`${listStyles.controlButton} ${styles.shareButton}`} onClick={shareLink}>
            <Icon img={shareIcon} />
        </button>
    );
}

export default ShareLinkControl;
