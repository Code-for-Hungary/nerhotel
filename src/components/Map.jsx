import { useContext, useState, useCallback, useEffect, useRef, useMemo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { CSSTransition } from "react-transition-group";
import { useSearchParams } from "react-router";
import LocateControl from "./LocateControl";
import MapListOpener from "./MapListOpener";
import { useTranslation } from "react-i18next";
import ShareLinkControl from "./ShareLinkControl";

import styles from "../css/map.module.css";
import { MapContext } from "../context";

import { useHotelsContext } from "../context/hotels-provider.jsx";

import { config } from "../config.js";
import filterPoints from "../utils/map/filter-points.js";
import MapCluster from "./MapCluster";
import MapPlaceholder from "./MapPlaceholder";

import Popup from "./Popup";
import FilterControl from "./FilterControl";

function Map() {
    const [showPopup, setShowPopup] = useState();
    const [selectedPoint, setSelectedPoint] = useState();
    const { dispatch, center } = useContext(MapContext);
    const { t, i18n } = useTranslation();
    const transitionContainerRef = useRef(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const close = useCallback(() => {
        setSelectedPoint(undefined);
        setShowPopup(false);
    }, [dispatch]);

    const { hotels, isLoading } = useHotelsContext();
    const [map, setMap] = useState(null);
    const [filterType, setFilterType] = useState("mind");
    const [filteredPoints, setFilteredPoints] = useState([]);
    const [hasInitialFlyTo, setHasInitialFlyTo] = useState(false);

    const calcPoints = useCallback(
        (map) => {
            if (map) {
                const mapBounds = map.getBounds();
                let points = filterPoints(hotels, mapBounds);
                if (filterType !== "mind") points = points.filter((point) => point.properties.type.includes(filterType));
                setFilteredPoints(points);
                dispatch({ type: "SetList", list: points });
            }
        },
        [hotels, dispatch, filterType]
    );

    useEffect(() => {
        calcPoints(map);
        if (!isLoading && hotels.length) {
            if (map) {
                dispatch({ type: "SetMap", map });
            }
        }
    }, [dispatch, isLoading, calcPoints, map, hotels]);

    const setMapToUsersLocation = useCallback(() => {
        if (map) {
            map.locate()
                .on("locationfound", (e) => {
                    setShowPopup(false);
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

    const shareLink = useCallback(() => {
        if (map) {
            const center = map.getCenter();
            const zoom = map.getZoom();
            const newParams = {
                lat: center.lat.toFixed(4),
                lng: center.lng.toFixed(4),
                zoom: zoom.toString(),
            };
            if (filterType !== "mind") {
                newParams.filter = filterType;
            }
            setSearchParams(newParams, { replace: true });
            const url = `${window.location.origin}${window.location.pathname}?${new URLSearchParams(newParams).toString()}`;
            navigator.clipboard.writeText(url);
        }
    }, [map, filterType, setSearchParams]);

    useEffect(() => {
        if (map && !hasInitialFlyTo) {
            const lat = searchParams.get("lat");
            const lng = searchParams.get("lng");
            const zoom = searchParams.get("zoom");
            const filter = searchParams.get("filter");

            if (lat && lng && zoom) {
                map.flyTo([parseFloat(lat), parseFloat(lng)], parseInt(zoom));
            }

            if (filter) {
                setFilterType(filter);
            }

            setHasInitialFlyTo(true);
        }
    }, [map, hasInitialFlyTo, searchParams]);

    function onMarkerClickCallback(point) {
        console.log("point", point);
        setSelectedPoint(point);
        setShowPopup(true);
    }

    function openLocationList(map) {
        calcPoints(map);
        dispatch({ type: "ToggleList", showList: true });
        setShowPopup(false);
    }

    function onClusterClickHandler() {
        setShowPopup(false);
    }

    function moveHandler() {
        console.log("moveHandler");
        calcPoints(map);
    }

    const mapDisplay = useMemo(() => {
        if (isLoading) {
            return <MapPlaceholder />;
        }

        return (
            <MapContainer className="markercluster-map" center={center} zoom={6} maxZoom={config.map.maxZoom}>
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
                <FilterControl language={i18n.language} filterType={filterType} setFilterType={setFilterType} />
                <ShareLinkControl shareLink={shareLink} />
            </MapContainer>
        );
    }, [isLoading, filteredPoints, center]);

    return (
        <>
            <div className={styles.map}>
                <div className={styles.mapWrapper}>{mapDisplay}</div>
            </div>
            <CSSTransition in={showPopup} nodeRef={transitionContainerRef} classNames="Popup" unmountOnExit timeout={200}>
                <Popup point={selectedPoint} onClose={close} ref={transitionContainerRef} />
            </CSSTransition>
        </>
    );
}

export default Map;
