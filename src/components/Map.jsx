import { useContext, useState, useCallback, useEffect, useRef } from "react";
import { MapContainer as Map, TileLayer } from "react-leaflet";
import { CSSTransition } from "react-transition-group";
import LocateControl from "./LocateControl";
import MapListOpener from "./MapListOpener";
import { useTranslation } from "react-i18next";

import styles from "../css/map.module.css";
import { MapContext, HotelContext } from "../context";

import { config } from "../config.js";
import filterPoints from "../utils/map/filter-points.js";
import MapCluster from "./MapCluster";
import MapPlaceholder from "./MapPlaceholder";

import Popup from "./Popup";

function MapComponent() {
    const { dispatch, showPopup, center, selectedPoint, isDataLoaded } = useContext(MapContext);
    const { t } = useTranslation();
    const transitionContainerRef = useRef(null);

    const close = useCallback(() => {
        dispatch({ type: "SetSelectedPoint", point: null });
        dispatch({ type: "TogglePopup", showPopup: false });
    }, [dispatch]);

    const { hotels } = useContext(HotelContext);
    const [loaded, setLoaded] = useState(false);
    const [map, setMap] = useState(null);
    const [filteredPoints, setFilteredPoints] = useState([]);

    const calcPoints = useCallback(
        (map) => {
            if (map) {
                const mapBounds = map.getBounds();
                const points = filterPoints(hotels, mapBounds);
                setFilteredPoints(points);
                dispatch({ type: "SetList", list: points });
            }
        },
        [hotels, dispatch]
    );

    useEffect(() => {
        calcPoints(map);
        if (!loaded && hotels.length) {
            if (map) {
                dispatch({ type: "SetMap", map });
            }
            setLoaded(true);
        }
    }, [dispatch, loaded, calcPoints, map, hotels]);

    const setMapToUsersLocation = useCallback(() => {
        if (map) {
            map.locate()
                .on("locationfound", (e) => {
                    dispatch({ type: "TogglePopup", showPopup: false });
                    map.flyTo(e.latlng, config.map.closeZoomLevel);
                })
                .on("locationerror", (e) => {
                    alert(t("error.noGeoLocation"));
                    console.error(e);
                });
        }
    }, [map, dispatch, t]);

    useEffect(() => {
        if (showPopup && selectedPoint && map) {
            map.flyTo(selectedPoint.geometry.coordinates, map.getZoom());
        }
    }, [map, showPopup, selectedPoint]);

    function onMarkerClickCallback(point) {
        dispatch({ type: "SetSelectedPoint", point });
        dispatch({ type: "TogglePopup", showPopup: true });
    }

    function openLocationList(map) {
        calcPoints(map);
        dispatch({ type: "ToggleList", showList: true });
        dispatch({ type: "TogglePopup", showPopup: false });
    }

    function onClusterClickHandler() {
        dispatch({ type: "TogglePopup", showPopup: false });
    }

    function moveHandler() {
        calcPoints(map);
    }

    return (
        <>
            <div className={styles.map}>
                <div className={styles.mapWrapper}>
                    {isDataLoaded ? (
                        <Map className="markercluster-map" center={center} zoom={6} maxZoom={config.map.maxZoom}>
                            <TileLayer url={config.map.url} attribution={config.map.attribution} />
                            <MapCluster
                                filteredPoints={filteredPoints}
                                selectedPoint={selectedPoint}
                                onMarkerClickCallback={onMarkerClickCallback}
                                setMap={setMap}
                                onClusterClick={onClusterClickHandler}
                                onMove={moveHandler}
                            />
                            <LocateControl setMapToUsersLocation={setMapToUsersLocation} />
                            <MapListOpener onLocationListOpen={openLocationList} />
                        </Map>
                    ) : (
                        <MapPlaceholder />
                    )}
                </div>
            </div>
            <CSSTransition in={showPopup} nodeRef={transitionContainerRef} classNames="Popup" unmountOnExit timeout={200}>
                <Popup point={selectedPoint} onClose={close} ref={transitionContainerRef} />
            </CSSTransition>
        </>
    );
}

export default MapComponent;
