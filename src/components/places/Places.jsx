import { MapContainer } from "react-leaflet";

import styles from "../../css/map.module.css";

import { usePlacesContext } from "../../context/places-provider.jsx";

import { config } from "../../config.js";
import MapPlaceholder from "./MapPlaceholder.jsx";

import { MapView } from "./MapView.jsx";

const INITIAL_CENTER = [47.498045, 19.0385183];

function Places() {
    const { places, isLoading } = usePlacesContext();

    if (isLoading) {
        return <MapPlaceholder />;
    }

    if (!isLoading && places.length) {
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

    return null;
}

export default Places;
