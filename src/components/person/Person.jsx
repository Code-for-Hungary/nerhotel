import { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { useTranslation } from "react-i18next";
import Leaflet from "leaflet";
import { MapContainer as Map, TileLayer, Marker, Tooltip } from "react-leaflet";

import { SmartLink } from "../SmartLink";
import AssociatedPlace from "./AssociatedPlace.jsx";

import Icon from "../ui/Icon";

import ErrorBoundary from "../ErrorBoundary.jsx";

import styles from "../../css/place.module.css";
import arrowIcon from "../../assets/arrow-icon.svg";
import placeIcon from "../../assets/place-icon.svg";
import horseIcon from "../../assets/horse-icon.svg";

import { config } from "../../config";

import { ORANGE_ICON } from "../../leaflet-helper";
import { createClusterCustomIcon } from "../../leaflet-helper.jsx";

import { OnePercentDonationBanner } from "../one-percent-donation-banner";
import { useBannerContext } from "../../context/banner-provider.jsx";

import PersonProfile, { PersonProfileSkeleton } from "./PersonProfile";

import { KNOWN_ROUTES } from "../../config";

const Person = ({ personName, affiliatedPlaces, isMainOligarch, kMonitorDbId }) => {
    const { t } = useTranslation();
    const { lang } = useParams();
    const navigate = useNavigate();
    const { isVisible: isBannerVisible, onDismiss } = useBannerContext();

    /** @type {{name: string, link: string}|undefined} */
    const person =
        affiliatedPlaces && affiliatedPlaces.length
            ? affiliatedPlaces[0].properties.ceos.find((ceo) => ceo.name === personName) ||
              affiliatedPlaces[0].properties.oligarchs.find((oligarch) => oligarch.name === personName)
            : undefined;
    /** @type {string} */
    const personUrl = affiliatedPlaces.length && person ? person.link : "";

    const bounds = affiliatedPlaces.length
        ? new Leaflet.LatLngBounds(affiliatedPlaces.map((place) => [place.geometry.coordinates[0], place.geometry.coordinates[1]]))
        : undefined;

    return (
        <div className={styles.place}>
            {isBannerVisible && <OnePercentDonationBanner isInline onDismiss={onDismiss} />}
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
                                <SmartLink to={`/${KNOWN_ROUTES.ABOUT}`} style={{ lineHeight: 0 }}>
                                    <Icon img={horseIcon} size="large" className={styles.inlineIcon} />
                                </SmartLink>
                            )}
                            {personName}
                        </h1>

                        {kMonitorDbId && lang === "hu" && (
                            <ErrorBoundary fallback={null}>
                                <Suspense fallback={<PersonProfileSkeleton />}>
                                    <PersonProfile id={kMonitorDbId} />
                                </Suspense>
                            </ErrorBoundary>
                        )}

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
                                        {affiliatedPlaces.map((place) => (
                                            <AssociatedPlace place={place} key={place.properties.id} />
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                        <SmartLink to="/" className={styles.back} title={t("general.backToMap")}>
                            <Icon img={arrowIcon} alt={t("general.backToMap")} size="large" />
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
                                                    navigate(`/${KNOWN_ROUTES.PLACE}/${place.properties.id}`);
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
