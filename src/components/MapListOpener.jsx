import { useMap } from "react-leaflet";
import Icon from "../components/ui/Icon";
import listIcon from "../assets/menu-icon.svg";
import styles from "../css/map-list-opener.module.css";

function MapListOpener({ onLocationListOpen }) {
    const map = useMap();

    return (
        <button
            className={`${styles.controlButton} ${styles.listButton}`}
            onClick={() => {
                onLocationListOpen(map);
            }}
        >
            <Icon img={listIcon} size="small" />
        </button>
    );
}

export default MapListOpener;
