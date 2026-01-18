import { useState } from "react";
import { MapContainer } from "react-leaflet";

import styles from "../../css/map.module.css";

import { useHotelsContext } from "../../context/hotels-provider.jsx";

import { config } from "../../config.js";
import filterPoints from "../../utils/map/filter-points.js";
import MapPlaceholder from "./MapPlaceholder.jsx";

import { MapView } from "./MapView.jsx";
import ListView from "../List.jsx";

const INITIAL_CENTER = [47.498045, 19.0385183];

function Hotels() {
    const { hotels, isLoading } = useHotelsContext();

    if (isLoading) {
        <MapPlaceholder />;
    }

    if (!isLoading && hotels.length) {
        return (
            <div className={styles.map}>
                <div className={styles.mapWrapper} id="mapWrapper">
                    <MapContainer center={INITIAL_CENTER} zoom={6} maxZoom={config.map.maxZoom}>
                        <MapView hotels={hotels} />
                    </MapContainer>
                </div>
            </div>
        );
    }

    return null;
}

export default Hotels;
