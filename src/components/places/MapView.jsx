import { useEffect, useState, useRef, useMemo, useCallback, memo } from "react";
import { createPortal } from "react-dom";
import { TileLayer, useMap, Marker, Tooltip } from "react-leaflet";
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
import "./Popup.transition.css";

import getPointsWithinBounds from "../../utils/map/get-points-within-bounds.js";
import { filterPlaces } from "../../utils/map/filter-places.js";
import { useAnalyticsContext } from "../analytics/AnalyticsProvider.jsx";

import List from "../List.jsx";

import { Controls } from "./Controls.jsx";

const preloadBlue = new Image();
preloadBlue.src = BLUE_ICON;

const MemoizedMarker = memo(({ place, onMarkerClick, selectionRef }) => {
    const [, setTick] = useState(0);
    const pointId = place.properties.id;

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
    const [latitude, longitude] = place.geometry.coordinates;

    if (Number.isNaN(latitude) || Number.isNaN(longitude)) return null;

    return (
        <Marker
            position={[latitude, longitude]}
            icon={icon}
            eventHandlers={{
                click: () => onMarkerClick(place),
            }}
        >
            <Tooltip>{place.properties.name}</Tooltip>
        </Marker>
    );
});

MemoizedMarker.displayName = "MemoizedMarker";

export function MapView({ places }) {
    const map = useMap();
    const { dispatchAnalyticsEvent } = useAnalyticsContext();

    const [filterType, setFilterType] = useState("mind");

    const filteredPlaces = useMemo(() => places.filter((place) => filterPlaces(place, filterType)), [places, filterType]);
    const [pointsShownOnMap, setPointsShownOnMap] = useState(filteredPlaces);

    const { t } = useTranslation();

    const popUpTransitionContainerRef = useRef(null);
    const listTransitionContainerRef = useRef(null);

    const [searchParams, setSearchParams] = useSearchParams();

    const [showList, setShowList] = useState(false);
    const [showPopUp, setShowPopUp] = useState(false);

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
        return getPointsWithinBounds(filteredPlaces, map.getBounds());
    }

    function openLocationList() {
        setPointsShownOnMap(getPointsToDisplay());
        setShowList(true);
        selectionRef.current = undefined;
        setShowPopUp(false);
    }

    // Wrapped in useCallback since it's a dependency of a memoized component
    const onClusterClickHandler = useCallback(() => {
        selectionRef.current = undefined;
        setShowPopUp(false);
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
    }, []);

    useEffect(() => {
        if (selectedPoint) {
            map.flyTo(selectedPoint.geometry.coordinates, map.getZoom());
            dispatchAnalyticsEvent({
                type: "OpenPopup",
                payload: { name: selectedPoint.properties.name, id: selectedPoint.properties.id },
            });
        }
    }, [map, selectedPoint]);

    const setMapToUsersLocation = () => {
        map.locate()
            .on("locationfound", (e) => {
                selectionRef.current = undefined;
                setShowPopUp(false);
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
        setShowPopUp(true);

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
        setShowPopUp(false);

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

    const memoizedMap = useMemo(
        () => (
            <MarkerClusterGroup
                maxClusterRadius={6}
                zoomToBoundsOnClick
                showCoverageOnHover={false}
                iconCreateFunction={createClusterCustomIcon}
                chunkedLoading
                onClick={onClusterClickHandler}
                // IMPORTANT: the key is needed to re-add markers when the filters change,
                // if the filter is taken from the URL the memoized list seems to get stuck and pins are duplicated
                key={filterType}
            >
                {filteredPlaces.map((place) => (
                    <MemoizedMarker
                        // the name is only added to the key to add debugging (we'll see this in the React Tree view in the devTools)
                        key={`${place.properties.id}-${place.properties.name}`}
                        place={place}
                        onMarkerClick={onMarkerClickCallback}
                        selectionRef={selectionRef}
                    />
                ))}
            </MarkerClusterGroup>
        ),
        // IMPORTANT: selectedPoint is NOT listed as dependency of useMemo.
        // This prevents the "Flash" because the Map is never rebuilt.
        [filteredPlaces, filterType, onMarkerClickCallback]
    );

    return (
        <>
            {createPortal(
                <CSSTransition
                    mountOnEnter
                    unmountOnExit
                    in={showList}
                    nodeRef={listTransitionContainerRef}
                    timeout={200}
                    classNames="List"
                >
                    <List
                        list={pointsShownOnMap}
                        onItemClick={onListItemClick}
                        onClose={closeList}
                        ref={listTransitionContainerRef}
                        style={{ position: "relative", top: "var(--header-height)" }}
                        emptyState={t("list.mapEmptyState")}
                    />
                </CSSTransition>,
                document.body
            )}
            {!showList && (
                <>
                    <TileLayer url={config.map.url} attribution={config.map.attribution} />
                    {memoizedMap}
                    <Controls>
                        <LocateControl label={t("mapControl.location")} setMapToUsersLocation={setMapToUsersLocation} />
                        <MapListOpener label={t("mapControl.list")} onLocationListOpen={openLocationList} />
                        <FilterControl label={t("mapControl.filter")} filterType={filterType} setFilterType={setFilterType} />
                        <ShareLinkControl label={t("mapControl.share")} shareLink={shareLink} />
                    </Controls>
                </>
            )}

            {createPortal(
                <CSSTransition
                    mountOnEnter
                    unmountOnExit
                    in={showPopUp}
                    nodeRef={popUpTransitionContainerRef}
                    classNames="Popup"
                    timeout={200}
                    onExited={() => {
                        setSelectedPoint(undefined);
                    }}
                >
                    <Popup point={selectedPoint} onClose={closePopUp} ref={popUpTransitionContainerRef} />
                </CSSTransition>,
                document.getElementById("mapWrapper")
            )}
        </>
    );
}
