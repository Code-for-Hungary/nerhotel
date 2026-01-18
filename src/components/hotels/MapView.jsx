import { useEffect, useState, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { TileLayer, useMap, Marker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { CSSTransition } from "react-transition-group";

import LocateControl from "./LocateControl.jsx";
import MapListOpener from "./MapListOpener.jsx";
import ShareLinkControl from "./ShareLinkControl.jsx";
import { config } from "../../config.js";
import FilterControl from "./FilterControl.jsx";
import { createClusterCustomIcon, getIcon } from "../../leaflet-helper.jsx";
import Popup from "./Popup.jsx";
import filterPoints from "../../utils/map/filter-points.js";
import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import List from "../List.jsx";
import orangeIcon from "../../assets/marker-icon-orange.svg";
import blueIcon from "../../assets/marker-icon-blue.svg";

export function MapView({ hotels }) {
    const map = useMap();
    const [filterType, setFilterType] = useState("mind");
    const [pointsToDisplay, setPointsToDisplay] = useState([]);
    const { t, i18n } = useTranslation();
    const transitionContainerRef = useRef(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [showPopup, setShowPopup] = useState(false);
    const [showList, setShowList] = useState(false);
    const [selectedPoint, setSelectedPoint] = useState();

    console.log("MapView Rendered");

    const closeList = () => setShowList(false);

    const getPointsToDisplay = () => {
        const mapBounds = map.getBounds();
        let points = filterPoints(hotels, mapBounds);
        if (filterType !== "mind") points = points.filter((point) => point.properties.type.includes(filterType));

        return points;
    };

    const shareLink = () => {
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
    };

    function onMarkerClickCallback(point) {
        setSelectedPoint(point);
        setShowPopup(true);
    }

    function openLocationList() {
        setShowList(true);
        setShowPopup(false);
    }

    function onClusterClickHandler() {
        setShowPopup(false);
    }

    function moveHandler() {
        setPointsToDisplay(getPointsToDisplay());
    }

    useEffect(() => {
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
    }, [map, searchParams]);

    useEffect(() => {
        if (showPopup && selectedPoint) {
            map.flyTo(selectedPoint.geometry.coordinates, map.getZoom());
        }
    }, [map, showPopup, selectedPoint]);

    const setMapToUsersLocation = () => {
        map.locate()
            .on("locationfound", (e) => {
                setShowPopup(false);
                map.flyTo(e.latlng, config.map.closeZoomLevel);
            })
            .on("locationerror", (e) => {
                alert(t("error.noGeoLocation"));
                console.error(e);
            });
    };

    const closePopUp = () => {
        setSelectedPoint(undefined);
        setShowPopup(false);
    };

    useEffect(() => {
        if (!pointsToDisplay.length) {
            setPointsToDisplay(getPointsToDisplay());
        }
    }, []);

    // useMapEvents({
    //     zoomend: moveHandler,
    //     moveend: moveHandler,
    // });

    // const showItem = useCallback(
    //     (item) => () => {
    //         const [lat, lng] = item.geometry.coordinates;
    //         if (map) {
    //             map.setView([lat, lng], 18);
    //         }
    //         // dispatch({ type: "SetCenter", center: [lat, lng] });
    //         // dispatch({ type: "SetSelectedPoint", point: item });
    //         dispatch({ type: "ToggleList", showList: false });
    //         if (location.pathname !== "/") {
    //             navigate("/");
    //         }
    //     },
    //     [map, dispatch, history, location]
    // );

    const onListItemClick = (item) => {};

    const displayMap = useMemo(
        () => (
            <>
                <TileLayer url={config.map.url} attribution={config.map.attribution} />
                <MarkerClusterGroup
                    maxClusterRadius={6}
                    zoomToBoundsOnClick={true}
                    showCoverageOnHover={false}
                    iconCreateFunction={createClusterCustomIcon}
                    chunkedLoading
                    onClick={onClusterClickHandler}
                >
                    {/* {getMarkerList({
                        points: pointsToDisplay,
                        selectedPoint,
                        clickCallback: onMarkerClickCallback,
                    })} */}
                    {pointsToDisplay.map((point) => {
                        const [latitude, longitude] = point.geometry.coordinates;
                        const isSelected = selectedPoint && selectedPoint.properties.id === point.properties.id;
                        const DefaultIcon = getIcon(orangeIcon);
                        const ActiveIcon = getIcon(blueIcon);

                        return (
                            <Marker
                                position={[latitude, longitude]}
                                key={point.properties.id}
                                icon={isSelected ? ActiveIcon : DefaultIcon}
                                eventHandlers={{
                                    click: () => {
                                        onMarkerClickCallback(point);
                                    },
                                }}
                            />
                        );
                    })}
                </MarkerClusterGroup>
            </>
        ),
        [pointsToDisplay]
    );

    if (showList) {
        return createPortal(<List list={pointsToDisplay} onClose={closeList} />, document.getElementById("mapWrapper"));
    }

    if (!showList) {
        return (
            <>
                {displayMap}
                <LocateControl setMapToUsersLocation={setMapToUsersLocation} />
                <MapListOpener onLocationListOpen={openLocationList} />
                <FilterControl language={i18n.language} filterType={filterType} setFilterType={setFilterType} />
                <ShareLinkControl shareLink={shareLink} />

                {createPortal(
                    <CSSTransition in={showPopup} nodeRef={transitionContainerRef} classNames="Popup" unmountOnExit timeout={200}>
                        <Popup point={selectedPoint} onClose={closePopUp} ref={transitionContainerRef} />
                    </CSSTransition>,
                    document.getElementById("mapWrapper")
                )}
            </>
        );
    }

    return null;
}
