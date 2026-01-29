import Icon from "../ui/Icon";
import listIcon from "../../assets/list-icon.svg";
import styles from "../../css/map-list-opener.module.css";

function MapListOpener({ onLocationListOpen }) {
    return (
        <button className={`${styles.controlButton} ${styles.listButton}`} onClick={onLocationListOpen}>
            <Icon img={listIcon} size="small" />
        </button>
    );
}

export default MapListOpener;
