import { MapContainer } from "react-leaflet";

import styles from "../../css/map.module.css";

import { config } from "../../config.js";

import { MapView } from "./MapView.jsx";

const INITIAL_CENTER = [47.498045, 19.0385183];

function Places({ places }) {
    if (!places || !places.length) {
        return null;
    }

    return (
        <div className={styles.map} id="map">
            <div className={styles.mapWrapper} id="mapWrapper">
                <MapContainer center={INITIAL_CENTER} zoom={6} maxZoom={config.map.maxZoom}>
                    <MapView places={places} />
                </MapContainer>
            </div>
        </div>
    );
}

export default Places;
