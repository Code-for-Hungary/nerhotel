import { useContext, useState, createRef, useCallback, useEffect } from 'react';
import {Map, TileLayer} from 'react-leaflet';
import LocateControl from './LocateControl.js';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import Popup from '../components/Popup';
import Icon from '../components/Icon';

import listIcon from '../assets/menu-icon.svg';

import styles from '../css/map.module.css';
import { MapContext, HotelContext } from '../context';
import {createClusterCustomIcon, getMarkerList} from '../leaflet-helper.js';

import { config } from '../config.js';
import filterPoints from '../utils/map/filter-points.js';

function MapComponent() {
  const {
    dispatch,
    showPopup,
    center,
    selectedPoint,
    locationRequired
  } = useContext(MapContext);
  const { hotels } = useContext(HotelContext);
  const [loaded, setLoaded] = useState(false);
  const [filteredPoints, setFilteredPoints] = useState([]);
  const mapRef = createRef();
  const calcPoints = useCallback(() => {
    if(mapRef.current && mapRef.current.leafletElement) {
      const mapBounds = mapRef.current.leafletElement.getBounds();
      const points = filterPoints(hotels, mapBounds);
      setFilteredPoints(points);
      dispatch({ type: 'SetList', list: points });
    }
  }, [hotels, dispatch, mapRef]);

  useEffect(() => {
    if (!loaded && hotels.length) {
      calcPoints();
      dispatch({ type: 'SetMap', map: mapRef.current.leafletElement });
      setLoaded(true);
    }
  }, [dispatch, loaded, calcPoints, mapRef, hotels]);

  useEffect(() => {
    if (!locationRequired) {
      dispatch({ type: 'SetLocator' });
    }
  }, [locationRequired, dispatch]);

  const onMarkerClickCallback = useCallback(createCallbackForPoint, [dispatch]);

  /**
   * @param {Hotel} point
   * @returns {function(): void}
   */
  function createCallbackForPoint(point) {
    return () => {
      dispatch({type: 'SetSelectedPoint', point});
      dispatch({type: 'TogglePopup', showPopup: true});
    };
  }

  const openLocationListCallback = useCallback(() => {
    calcPoints();
    dispatch({ type: 'ToggleList', showList: true });
  }, [dispatch, calcPoints]);

  return (
    <>
      <div className={styles.map}>
        <div className={styles.mapWrapper}>
          <Map
            ref={mapRef}
            className="markercluster-map"
            center={center}
            zoom={6}
            maxZoom={config.map.maxZoom}
            onZoomEnd={calcPoints}
            onMoveEnd={calcPoints}
          >
            <TileLayer
              url={config.map.url}
              attribution={config.map.attribution}
            />
            <MarkerClusterGroup maxClusterRadius={6} zoomToBoundsOnClick={true} showCoverageOnHover={false} iconCreateFunction={createClusterCustomIcon}>
              {getMarkerList({points: filteredPoints, selectedPoint, clickCallback: onMarkerClickCallback})}
            </MarkerClusterGroup>
            <LocateControl
              options={
                {
                  position: 'topright',
                  keepCurrentZoomLevel: false,
                  drawCircle: true,
                  enableHighAccuracy: true,
                  compassStyle: { radius: 2, color: '#65a' }
                }
              }
              started={locationRequired}
            />
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
