import React from 'react';

import { Map, Marker, TileLayer } from 'react-leaflet';
import LocateControl from './LocateControl.js';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import L from 'leaflet';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import orangeIcon from '../assets/marker-icon-orange.svg';
import blueIcon from '../assets/marker-icon-blue.svg';

import Popup from '../components/Popup';
import Icon from '../components/Icon';

import listIcon from '../assets/menu-icon.svg';

import styles from '../css/map.module.css';
import { MapContext, HotelContext } from '../context';


const filterPoints = (points, bounds) => {
  return points.filter(point => {
    const [latitude, longitude] = point.geometry.coordinates;
    return (longitude > bounds._southWest.lng && longitude < bounds._northEast.lng
      && latitude > bounds._southWest.lat && latitude < bounds._northEast.lat);
  });
};

const locateOptions = {
    position: 'topright',
    keepCurrentZoomLevel: false,
    drawCircle: true,
    enableHighAccuracy: true,
    compassStyle: { radius: 2, color: '#65a' }
  };

const getIcon = (iconUrl) => {
  return L.icon({
    iconUrl,
    shadowUrl: iconShadow,
    iconSize: [40, 62],
    iconAnchor: [20, 52],
    shadowSize: [40, 62],
    shadowAnchor: [12, 62]
  });
};

const createClusterCustomIcon = (cluster) => {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: styles.clusterMarker,
    iconSize: L.point(40, 40, true),
  });
};

const getMarkerList = (filteredPoints, selectedPoint, callback) => {
  return filteredPoints.map((point, i) => {
    const [lat, lng] = point.geometry.coordinates;
    const isSelected = selectedPoint && selectedPoint.properties.id === point.properties.id;
    const DefaultIcon = getIcon(orangeIcon);
    const ActiveIcon = getIcon(blueIcon);

    return (
      <Marker position={[lat, lng]} key={i} icon={isSelected ? ActiveIcon : DefaultIcon} onClick={callback(point)}/>
    );
  });
};

function MapComponent() {
  const {
    dispatch,
    showPopup,
    center,
    selectedPoint,
    locationRequired,
    map
  } = React.useContext(MapContext);
  const { hotels } = React.useContext(HotelContext);
  const [loaded, setLoaded] = React.useState(false);
  const [filteredPoints, setFilteredPoints] = React.useState([]);
  const mapRef = React.createRef();
  const calcPoints = React.useCallback(() => {
    let mapBounds = mapRef.current.leafletElement.getBounds();
    const points = filterPoints(hotels, mapBounds);
    setFilteredPoints(points);
    dispatch({ type: 'SetList', list: points })
  }, [hotels, dispatch, mapRef]);

  React.useEffect(() => {
    if (!loaded) {
      calcPoints();
      dispatch({ type: 'SetMap', map: mapRef.current.leafletElement });
      setLoaded(true);
    }
  }, [dispatch, loaded, calcPoints, mapRef, map]);

  React.useEffect(() => {
    if (!locationRequired) {
      dispatch({ type: 'SetLocator' });
    }
  }, [locationRequired, dispatch]);

  const onMarkerClickCallback = React.useCallback((point) => () => {
    dispatch({ type: 'SetSelectedPoint', point });
    dispatch({ type: 'TogglePopup', showPopup: true });
  }, [dispatch]);

  const openLocationListCallback = React.useCallback(() => {
    calcPoints();
    dispatch({ type: 'ToggleList', showList: true });
  }, [dispatch, calcPoints]);

  return (
    <>
      <div className={styles.map}>
        <div className={styles.mapWrapper}>
          <Map ref={mapRef} className="markercluster-map" center={center} zoom={16} maxZoom={19} onZoomEnd={calcPoints} onMoveEnd={calcPoints}>
            <TileLayer
              url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>"
            />
            <MarkerClusterGroup maxClusterRadius={6} zoomToBoundsOnClick={true} showCoverageOnHover={false} iconCreateFunction={createClusterCustomIcon}>
              {getMarkerList(filteredPoints, selectedPoint, onMarkerClickCallback)}
            </MarkerClusterGroup>
            <LocateControl options={locateOptions} started={locationRequired} />
          </Map>
          <div className={styles.listButton} onClick={openLocationListCallback}>
            <Icon img={listIcon} size="small"/>
          </div>
        </div>

      </div>
      {showPopup && (<Popup point={selectedPoint}/>)}
    </>
  );
}

export default MapComponent;
