import { useMap } from "react-leaflet";
import Icon from "../components/Icon";
import listIcon from "../assets/menu-icon.svg";
import styles from "../css/map-list-opener.module.css";

function MapListOpener({ onLocationListOpen }) {
  const map = useMap();

  return (
    <div
      className={`${styles.controlButton} ${styles.listButton}`}
      onClick={() => {
        onLocationListOpen(map);
      }}
    >
      <Icon img={listIcon} size="small" />
    </div>
  );
}

export default MapListOpener;
