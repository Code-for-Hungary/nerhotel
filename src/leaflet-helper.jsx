import Leaflet from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import styles from "./css/map.module.css";
import orangeIcon from "./assets/marker-icon-orange.svg";
import blueIcon from "./assets/marker-icon-blue.svg";

const iconBase = {
    shadowUrl: iconShadow,
    iconSize: [40, 62],
    iconAnchor: [20, 52],
    shadowSize: [40, 62],
    shadowAnchor: [12, 62],
};

export const ORANGE_ICON = Leaflet.icon({
    iconUrl: orangeIcon,
    ...iconBase,
});

export const BLUE_ICON = Leaflet.icon({
    iconUrl: blueIcon,
    ...iconBase,
});

export function createClusterCustomIcon(cluster) {
    return Leaflet.divIcon({
        html: `<span>${cluster.getChildCount()}</span>`,
        className: styles.clusterMarker,
        iconSize: Leaflet.point(40, 40, true),
    });
}
