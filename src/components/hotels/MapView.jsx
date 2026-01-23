import { useEffect, useState, useRef, useMemo, useCallback, memo } from "react";
import { createPortal } from "react-dom";
import { TileLayer, useMap, Marker } from "react-leaflet";
import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { CSSTransition } from "react-transition-group";

import LocateControl from "./LocateControl.jsx";
import MapListOpener from "./MapListOpener.jsx";
import ShareLinkControl from "./ShareLinkControl.jsx";
import { config } from "../../config.js";
import FilterControl from "./FilterControl.jsx";
import { createClusterCustomIcon, ORANGE_ICON, BLUE_ICON } from "../../leaflet-helper.jsx";
import Popup from "./Popup.jsx";

import getPointsWithinBounds from "../../utils/map/get-points-within-bounds.js";
import { filterPoints } from "../../utils/map/filter-points.js";

import List from "../List.jsx";

const MemoizedMarker = memo(({ point, onMarkerClick, selectionRef }) => {
    const [, setTick] = useState(0);
    const pointId = point.properties.id;

    useEffect(() => {
        const handleUpdate = (event) => {
            const affectedIds = event.detail?.ids || [];

            // Only trigger a re-render if THIS marker's ID is in the payload
            if (affectedIds.includes(pointId)) {
                setTick((t) => t + 1);
            }
        };

        window.addEventListener("markerUpdate", handleUpdate);
        return () => window.removeEventListener("markerUpdate", handleUpdate);
    }, [pointId]);

    const isSelected = selectionRef.current?.properties.id === pointId;
    const icon = isSelected ? BLUE_ICON : ORANGE_ICON;
    const [latitude, longitude] = point.geometry.coordinates;

    if (Number.isNaN(latitude) || Number.isNaN(longitude)) return null;

    return (
        <Marker
            position={[latitude, longitude]}
            icon={icon}
            eventHandlers={{
                click: () => onMarkerClick(point),
            }}
        />
    );
});

export function MapView({ hotels }) {
    const map = useMap();

    const [filterType, setFilterType] = useState("mind");

    const [pointsShownOnMap, setPointsShownOnMap] = useState(hotels);

    const { t } = useTranslation();

    const transitionContainerRef = useRef(null);

    const [searchParams, setSearchParams] = useSearchParams();

    const [showList, setShowList] = useState(false);

    const [selectedPoint, setSelectedPoint] = useState(); // tells the pop-up what's selected
    const selectionRef = useRef(selectedPoint); // Use this for the Markers

    const closeList = () => setShowList(false);

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

    function getPointsToDisplay() {
        return getPointsWithinBounds(
            hotels.filter((point) => filterPoints(point, filterType)),
            map.getBounds()
        );
    }

    function openLocationList() {
        setPointsShownOnMap(getPointsToDisplay());
        setShowList(true);
        selectionRef.current = undefined;
        setSelectedPoint(undefined);
    }

    // Wrapped in useCallback since it's a dependency of a memoized component
    const onClusterClickHandler = useCallback(() => {
        selectionRef.current = undefined;
        setSelectedPoint(undefined);
    }, []);

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
        if (selectedPoint) {
            map.flyTo(selectedPoint.geometry.coordinates, map.getZoom());
        }
    }, [map, selectedPoint]);

    const setMapToUsersLocation = () => {
        map.locate()
            .on("locationfound", (e) => {
                selectionRef.current = undefined;
                setSelectedPoint(undefined);
                map.flyTo(e.latlng, config.map.closeZoomLevel);
            })
            .on("locationerror", (e) => {
                alert(t("error.noGeoLocation"));
                console.error(e);
            });
    };

    // Wrapped in useCallback to keep it a stable reference for the memoized component
    // shouldn't be re-created when the MapView changes
    const onMarkerClickCallback = useCallback((point) => {
        const previousId = selectionRef.current?.properties.id;
        const nextId = point.properties.id;

        selectionRef.current = point;
        setSelectedPoint(point);

        // Dispatch one event with both IDs that need a refresh
        window.dispatchEvent(
            new CustomEvent("markerUpdate", {
                detail: { ids: [previousId, nextId] },
            })
        );
    }, []);

    // Wrap this in useCallback so that it's not recreated while the animation
    // of the CSSTransition is in progress which would create a glitch in the animation
    // also makes it safe to pass as dependency for the useEffect
    const closePopUp = useCallback(() => {
        const previousId = selectionRef.current?.properties.id;

        selectionRef.current = undefined;
        setSelectedPoint(undefined);

        // Refresh the one that was just closed
        window.dispatchEvent(
            new CustomEvent("markerUpdate", {
                detail: { ids: [previousId] },
            })
        );
    }, []);

    useEffect(() => {
        if (selectionRef.current !== undefined) {
            closePopUp();
        }
    }, [filterType]);

    const onListItemClick = () => {
        setShowList(false);
    };

    const displayMap = useMemo(
        () => (
            <>
                <TileLayer url={config.map.url} attribution={config.map.attribution} />
                {/* We wrap the cluster group in the Provider. 
                   We pass the CURRENT selectedPoint into the value.
                */}

                <MarkerClusterGroup
                    maxClusterRadius={6}
                    zoomToBoundsOnClick={true}
                    showCoverageOnHover={false}
                    iconCreateFunction={createClusterCustomIcon}
                    chunkedLoading
                    onClick={onClusterClickHandler}
                >
                    {hotels
                        .filter((point) => filterPoints(point, filterType))
                        .map((point) => (
                            <MemoizedMarker
                                key={point.properties.id}
                                point={point}
                                onMarkerClick={onMarkerClickCallback}
                                selectionRef={selectionRef}
                            />
                        ))}
                </MarkerClusterGroup>
            </>
        ),
        // IMPORTANT: selectedPoint is NOT listed as dependency of useMemo.
        // This prevents the "Flash" because the Map is never rebuilt.
        [hotels, filterType, onMarkerClickCallback]
    );

    if (showList) {
        return createPortal(
            <List list={pointsShownOnMap} onItemClick={onListItemClick} onClose={closeList} />,
            document.getElementById("mapWrapper")
        );
    }

    if (!showList) {
        return (
            <>
                {displayMap}
                <LocateControl setMapToUsersLocation={setMapToUsersLocation} />
                <MapListOpener onLocationListOpen={openLocationList} />
                <FilterControl filterType={filterType} setFilterType={setFilterType} />
                <ShareLinkControl shareLink={shareLink} />

                {createPortal(
                    <CSSTransition in={selectedPoint !== undefined} nodeRef={transitionContainerRef} classNames="Popup" timeout={200}>
                        <Popup point={selectedPoint} onClose={closePopUp} ref={transitionContainerRef} />
                    </CSSTransition>,
                    document.getElementById("mapWrapper")
                )}
            </>
        );
    }

    return null;
}
