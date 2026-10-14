import { MapContainer as LeafletMap, Marker, Tooltip, TileLayer } from "react-leaflet";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router";
import { Helmet } from "react-helmet-async";

import { SmartLink } from "../SmartLink.jsx";
import Icon from "../ui/Icon.jsx";
import PlaceImage from "./PlaceImage.jsx";

import { getOligarchData } from "../../utils/index.js";
import { ORANGE_ICON } from "../../leaflet-helper.jsx";
import getTranslatedPlaceProperty from "../../utils/get-translated-place-property.js";

import styles from "../../css/place.module.css";

import arrowIcon from "../../assets/arrow-icon.svg";
import horseIcon from "../../assets/horse-icon.svg";
import placeIcon from "../../assets/place-icon.svg";
import linkIcon from "../../assets/link-icon.svg";
import pinIcon from "../../assets/pin-icon.svg";

import { config } from "../../config.js";
import displayTranslatedPersonType from "../../utils/person/display-translated-person-type.js";

import { useBannerContext } from "../../context/banner-provider.jsx";
import { OnePercentDonationBanner } from "../one-percent-donation-banner";

/**
 * @typedef {Object} HotelGeometry
 * @property {string} type
 * @property {number[]} coordinates
 */

/**
 * @typedef {Object} Hotel
 * @property {HotelGeometry} geometry
 * @property {string} type
 * @property {Object} properties
 * @property {int} properties.id
 * @property {string} properties.name
 * @property {string} properties.type One of these:
 *           borászat, bár, étterem, fagyizó, fürdő, fürdő, kalandpark, kemping, kávézó, pékség, sport, szálloda, szálloda és strand, sörfőzde.
 * @property {string} properties.details
 * @property {string} properties.link
 * @property {string} properties.date
 * @property {string} properties.city
 * @property {string} properties.address
 * @property {{name: string, link: string}} properties.company
 * @property {{name: string, link: string}[]} properties.ceos
 * @property {{name: string, link: string}[]} properties.mainCEO
 * @property {{name: string, link: string}[]} properties.oligarchs
 * @property {{name: string, link: string}[]} properties.mainOligarch
 */
const Place = ({ place }) => {
    const { t, i18n } = useTranslation();
    const { resolvedLanguage } = i18n;
    const placeProperties = place ? place.properties : null;
    const coordinates = place ? place.geometry.coordinates : null;
    const oligarchData = place ? getOligarchData(placeProperties.oligarchs || [], placeProperties.ceos || []) : null;
    const navigate = useNavigate();
    const location = useLocation();
    const { isVisible, onDismiss } = useBannerContext();

    const backHandler = (e) => {
        if (location.key === "default") {
            return;
        }
        e.preventDefault();
        navigate(-1);
    };

    return (
        <div className={styles.place}>
            {isVisible && <OnePercentDonationBanner isInline onDismiss={onDismiss} />}
            <div className={styles.placeWrapper}>
                <div className={styles.info}>
                    {placeProperties ? (
                        <>
                            <Helmet>
                                <title>
                                    {getTranslatedPlaceProperty("name", resolvedLanguage, placeProperties)} - {t("general.siteName")}
                                </title>
                            </Helmet>
                            <h1>{getTranslatedPlaceProperty("name", resolvedLanguage, placeProperties)}</h1>
                            <div className={styles.placeRow}>
                                <p>
                                    {t("hotel.type")}: <span>{getTranslatedPlaceProperty("type", resolvedLanguage, placeProperties)}</span>
                                </p>
                            </div>
                            {placeProperties.company && (
                                <div className={styles.placeRow}>
                                    <Icon img={placeIcon} size="small" />
                                    <p>
                                        {t("general.maintainer")}:{" "}
                                        {placeProperties.company.link ? (
                                            <span>
                                                <SmartLink to={placeProperties.company.link}>{placeProperties.company.name}</SmartLink>
                                            </span>
                                        ) : (
                                            <span>{placeProperties.company.name}</span>
                                        )}
                                    </p>
                                </div>
                            )}
                            {oligarchData && (
                                <div className={styles.placeRow}>
                                    <Icon img={horseIcon} size="small" />
                                    <p>
                                        {t("hotel.people")}:<br />
                                        {oligarchData.map((oligarch) => (
                                            <span key={oligarch.name} className={styles.oligarch}>
                                                <SmartLink to={`/person/${oligarch.name}`}>{oligarch.name}</SmartLink>
                                                <span className={styles.title}>
                                                    {" "}
                                                    ({displayTranslatedPersonType(oligarch.data.type, t)})
                                                </span>
                                                <br />
                                            </span>
                                        ))}
                                    </p>
                                </div>
                            )}
                            {placeProperties.address && (
                                <div className={styles.placeRow}>
                                    <Icon img={pinIcon} size="small" />
                                    <p>
                                        {t("general.address")}: <span>{placeProperties.address}</span>
                                    </p>
                                </div>
                            )}
                            {placeProperties.link !== "" && (
                                <div className={styles.placeRow}>
                                    <Icon img={linkIcon} size="small" />
                                    <SmartLink to={getTranslatedPlaceProperty("link", resolvedLanguage, placeProperties)}>
                                        <span>{t("general.article")}</span>
                                    </SmartLink>
                                </div>
                            )}
                            {placeProperties.details !== "" && (
                                <div className={styles.placeRow}>
                                    <p>
                                        {(resolvedLanguage === "hu" && placeProperties.details) ||
                                        (resolvedLanguage === "en" && placeProperties.en.details) ? (
                                            <span style={{ display: "block" }}>{t("general.additionalInfo")}:</span>
                                        ) : null}
                                        {resolvedLanguage === "hu" ? placeProperties.details : null}
                                        {resolvedLanguage === "en" && placeProperties.en && placeProperties.en.details
                                            ? placeProperties.en.details
                                            : ""}
                                    </p>
                                </div>
                            )}
                            {placeProperties.date !== "" && (
                                <div className={styles.placeRow}>
                                    <p>
                                        {t("hotel.updatedOn")}: <span>{placeProperties.date}</span>
                                    </p>
                                </div>
                            )}

                            {placeProperties.picture && (
                                <PlaceImage
                                    src={placeProperties.picture}
                                    alt={getTranslatedPlaceProperty("name", resolvedLanguage, placeProperties)}
                                />
                            )}
                        </>
                    ) : null}

                    <SmartLink className={styles.back} to="/" onClick={backHandler}>
                        <Icon img={arrowIcon} alt={t("general.backToMap")} size="large" />
                    </SmartLink>
                </div>
                <div className={styles.map}>
                    {coordinates && !Number.isNaN(coordinates[0]) && !Number.isNaN(coordinates[1]) ? (
                        <LeafletMap center={coordinates} zoom={config.map.closeZoomLevel}>
                            <TileLayer url={config.map.url} attribution={config.map.attribution} />
                            <Marker position={coordinates} icon={ORANGE_ICON}>
                                <Tooltip>{getTranslatedPlaceProperty("name", resolvedLanguage, placeProperties)}</Tooltip>
                            </Marker>
                        </LeafletMap>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Place;
