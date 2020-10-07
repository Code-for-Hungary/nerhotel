import Leaflet from "leaflet";
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import styles from "./css/map.module.css";
import orangeIcon from "./assets/marker-icon-orange.svg";
import blueIcon from "./assets/marker-icon-blue.svg";
import {Marker} from "react-leaflet";
import React from "react";

export function createOrangeIcon() {
  return Leaflet.icon({
    iconUrl: orangeIcon,
    shadowUrl: iconShadow,
    iconSize: [40, 62],
    iconAnchor: [20, 52],
    shadowSize: [40, 62],
    shadowAnchor: [12, 62],
  });
}

export function createClusterCustomIcon(cluster) {
  return Leaflet.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: styles.clusterMarker,
    iconSize: Leaflet.point(40, 40, true),
  });
}


/**
 * @param {Hotel[]} filteredPoints
 * @param {Hotel|null} selectedPoint?
 * @param {function(Hotel): (function(): void)} callback
 * @returns {React.Component[]}
 */
export function getMarkerList(filteredPoints, selectedPoint, callback) {
  return filteredPoints.map((point, index) => {
    const [latitude, longitude] = point.geometry.coordinates;
    const isSelected = selectedPoint && selectedPoint.properties.id === point.properties.id;
    const DefaultIcon = getIcon(orangeIcon);
    const ActiveIcon = getIcon(blueIcon);

    return (
      <Marker position={[latitude, longitude]} key={index} icon={isSelected ? ActiveIcon : DefaultIcon} onClick={callback(point)}/>
    );
  });
}

function getIcon(iconUrl) {
  return Leaflet.icon({
    iconUrl,
    shadowUrl: iconShadow,
    iconSize: [40, 62],
    iconAnchor: [20, 52],
    shadowSize: [40, 62],
    shadowAnchor: [12, 62]
  });
}

