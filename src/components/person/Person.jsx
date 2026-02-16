import { useState, lazy, Suspense, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useLocation } from "react-router";
import MarkerClusterGroup from "react-leaflet-markercluster";

import { SmartLink } from "../SmartLink";
import { useTranslation } from "react-i18next";
import Leaflet from "leaflet";
import { MapContainer as Map, TileLayer, Marker, Tooltip } from "react-leaflet";
import { usePlacesContext } from "../../context/places-provider.jsx";
import AssociatedPlace from "./AssociatedPlace.jsx";
import LoadingSpinner from "../ui/LoadingSpinner";

import Icon from "../ui/Icon";

import styles from "../../css/place.module.css";
import arrowIcon from "../../assets/arrow-icon.svg";
import placeIcon from "../../assets/place-icon.svg";
import horseIcon from "../../assets/horse-icon.svg";

import { config } from "../../config";
import _getAllPlacesAffiliatedWithPerson from "../../utils/person/get-all-places-affiliated-with-person.js";
import getTranslatedKMonitorLink from "../../utils/person/get-translated-k-monitor-link";
import getPersonProfile from "../../utils/person/get-person-profile";

import { ORANGE_ICON } from "../../leaflet-helper";
import { createClusterCustomIcon } from "../../leaflet-helper.jsx";

const PersonProfile = lazy(() => import("./PersonProfile"));

function PersonProfileCard(props) {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <PersonProfile {...props} />
        </Suspense>
    );
}

const Person = (props) => {
    const personName = props.name;
    const { t, i18n } = useTranslation();
    const { resolvedLanguage } = i18n;
    const [isProfileInfoLoading, setIsProfileInfoLoading] = useState(false);
    const [profileInfo, setProfileInfo] = useState(null);
    const [profileInfoError, setProfileInfoError] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const backHandler = (e) => {
        if (location.key === "default") {
            return;
        }
        e.preventDefault();
        navigate(-1);
    };

    /** @type {Hotel[]} */
    const { places } = usePlacesContext();
    const affiliatedPlaces = _getAllPlacesAffiliatedWithPerson(places, personName);

    /** @type {{name: string, link: string}|undefined} */
    const person =
        affiliatedPlaces && affiliatedPlaces.length
            ? affiliatedPlaces[0].properties.ceos.find((ceo) => ceo.name === personName) ||
              affiliatedPlaces[0].properties.oligarchs.find((oligarch) => oligarch.name === personName)
            : undefined;
    const kMonitorDbId = person && person.id ? person.id : null;
    const isMainOligarch = !!(
        affiliatedPlaces &&
        affiliatedPlaces.length &&
        (affiliatedPlaces[0].properties.mainCEO.find((ceo) => ceo.name === personName) ||
            affiliatedPlaces[0].properties.mainOligarch.find((oligarch) => oligarch.name === personName))
    );
    /** @type {string} */
    let personUrl = affiliatedPlaces.length && person ? person.link : "";
    if (personUrl && resolvedLanguage === "en") {
        personUrl = getTranslatedKMonitorLink(personUrl);
    }

    const bounds = affiliatedPlaces.length
        ? new Leaflet.LatLngBounds(affiliatedPlaces.map((place) => [place.geometry.coordinates[0], place.geometry.coordinates[1]]))
        : undefined;

    const loadPersonProfile = useCallback(() => {
        if (kMonitorDbId && personName && resolvedLanguage === "hu") {
            setIsProfileInfoLoading(true);
            getPersonProfile(kMonitorDbId)
                .then((response) => {
                    if (response.results && response.results.length && response.results[0] && response.results[0].description) {
                        setProfileInfo({
                            name: personName,
                            profileImage: response.results[0].image_small_url,
                            text: response.results[0].description,
                        });
                    } else {
                        setProfileInfoError(true);
                    }
                })
                .catch((e) => {
                    console.error(e);
                    setProfileInfoError(true);
                })
                .finally(() => {
                    setIsProfileInfoLoading(false);
                });
        }
    }, [personName, kMonitorDbId, resolvedLanguage]);

    useEffect(loadPersonProfile, [loadPersonProfile]);

    return (
        <div className={[styles.place, "place"].join(" ")}>
            <Helmet>
                <title>
                    {personName} - {t("general.siteName")}
                </title>
            </Helmet>
            {affiliatedPlaces && affiliatedPlaces.length ? (
                <div className={styles.placeWrapper}>
                    <div className={styles.info}>
                        <h1>
                            {isMainOligarch && (
                                <SmartLink to="/about">
                                    <Icon img={horseIcon} size="large" className={styles.inlineIcon} />
                                </SmartLink>
                            )}
                            {personName}
                        </h1>

                        {isProfileInfoLoading ? <LoadingSpinner /> : null}
                        {!isProfileInfoLoading && !profileInfoError && profileInfo && resolvedLanguage === "hu" ? (
                            <PersonProfileCard {...profileInfo} />
                        ) : null}

                        {personUrl && (
                            <p>
                                {t("person.dbLink")}: <SmartLink to={personUrl}>{personName}</SmartLink>
                            </p>
                        )}
                        {affiliatedPlaces.length > 0 && (
                            <>
                                <div className={styles.placeRow}>
                                    <Icon img={placeIcon} size="small" />
                                    <p>{t("person.relatedPlaces")}:</p>
                                </div>
                                <div className={styles.placeRow}>
                                    <ul>
                                        {affiliatedPlaces.map((place, key) => (
                                            <AssociatedPlace place={place} key={key} />
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                        <SmartLink to="/" className={styles.back} onClick={backHandler}>
                            <Icon img={arrowIcon} alt={t("backToMap")} size="large" />
                        </SmartLink>
                    </div>
                    <div className={styles.map}>
                        <Map bounds={bounds}>
                            <TileLayer url={config.map.url} attribution={config.map.attribution} />
                            <MarkerClusterGroup
                                maxClusterRadius={6}
                                zoomToBoundsOnClick
                                showCoverageOnHover={false}
                                iconCreateFunction={createClusterCustomIcon}
                                chunkedLoading
                            >
                                {affiliatedPlaces.map((place) => {
                                    const [latitude, longitude] = place.geometry.coordinates;

                                    if (Number.isNaN(latitude) || Number.isNaN(longitude)) return null;

                                    return (
                                        <Marker
                                            position={[latitude, longitude]}
                                            key={`${place.properties.id}-${place.properties.name}`}
                                            icon={ORANGE_ICON}
                                            eventHandlers={{
                                                click: () => {
                                                    navigate(`/place/${place.properties.id}`);
                                                },
                                            }}
                                        >
                                            <Tooltip>{place.properties.name}</Tooltip>
                                        </Marker>
                                    );
                                })}
                            </MarkerClusterGroup>
                        </Map>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Person;
