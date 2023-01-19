import styles from "../css/map-list-opener.module.css";
import Icon from "./Icon";
import myLocationIcon from "../assets/my-location.svg";

function LocateControl({ setMapToUsersLocation }) {
  return (
    <button
      className={`${styles.controlButton} ${styles.locateButton}`}
      onClick={setMapToUsersLocation}
    >
      <Icon img={myLocationIcon} />
    </button>
  );
}

export default LocateControl;
