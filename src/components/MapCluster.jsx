import { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";

import { createClusterCustomIcon, getMarkerList } from "../leaflet-helper.jsx";
import MarkerClusterGroup from "react-leaflet-cluster";

function MapCluster({ filteredPoints, selectedPoint, onMarkerClickCallback, setMap, onClusterClick, onMove }) {
    const map = useMap();
    useMapEvents({
        zoomend: onMove,
        moveend: onMove,
    });

    useEffect(() => {
        setMap(map);
    }, [setMap, map]);

    return (
        <MarkerClusterGroup
            maxClusterRadius={6}
            zoomToBoundsOnClick={true}
            showCoverageOnHover={false}
            iconCreateFunction={createClusterCustomIcon}
            chunkedLoading
            onClick={onClusterClick}
        >
            {getMarkerList({
                points: filteredPoints,
                selectedPoint,
                clickCallback: onMarkerClickCallback,
            })}
        </MarkerClusterGroup>
    );
}

export default MapCluster;
