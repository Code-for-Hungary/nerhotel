import { useContext, useState, lazy, Suspense, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import { SmartLink } from "../SmartLink";
import { useTranslation } from "react-i18next";
import Leaflet from "leaflet";
import { MapContainer as Map, TileLayer } from "react-leaflet";
import { HotelContext } from "../../context";
import { getMarkerList } from "../../leaflet-helper.jsx";
import AssociatedHotel from "./AssociatedHotel";
import LoadingSpinner from "../ui/LoadingSpinner";

import Icon from "../ui/Icon";

import styles from "../../css/hotel.module.css";
import arrowIcon from "../../assets/arrow-icon.svg";
import hotelIcon from "../../assets/hotel-icon.svg";
import horseIcon from "../../assets/horse-icon.svg";

import { config } from "../../config";
import _getAllHotelsAffiliatedWithPerson from "../../utils/person/get-all-hotels-affiliated-with-person";
import getTranslatedKMonitorLink from "../../utils/person/get-translated-k-monitor-link";
import getPersonProfile from "../../utils/person/get-person-profile";

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
    const [profileInfo, setProfileInfo] = useState({});
    const [profileInfoError, setProfileInfoError] = useState(false);

    const hotelContext = useContext(HotelContext);
    /** @type {Hotel[]} */
    const hotels = hotelContext.hotels;
    const affiliatedHotels = _getAllHotelsAffiliatedWithPerson(hotels, personName);

    /** @type {{name: string, link: string}|undefined} */
    const person =
        affiliatedHotels && affiliatedHotels.length
            ? affiliatedHotels[0].properties.ceos.find((ceo) => ceo.name === personName) ||
              affiliatedHotels[0].properties.oligarchs.find((oligarch) => oligarch.name === personName)
            : undefined;
    const isMainOligarch = !!(
        affiliatedHotels &&
        affiliatedHotels.length &&
        (affiliatedHotels[0].properties.mainCEO.find((ceo) => ceo.name === personName) ||
            affiliatedHotels[0].properties.mainOligarch.find((oligarch) => oligarch.name === personName))
    );
    /** @type {string} */
    let personUrl = affiliatedHotels.length && person ? person.link : "";
    if (personUrl && resolvedLanguage === "en") {
        personUrl = getTranslatedKMonitorLink(personUrl);
    }

    const bounds = affiliatedHotels.length
        ? new Leaflet.LatLngBounds(affiliatedHotels.map((hotel) => [hotel.geometry.coordinates[0], hotel.geometry.coordinates[1]]))
        : undefined;

    const loadPersonProfile = useCallback(() => {
        setIsProfileInfoLoading(true);
        getPersonProfile(personName)
            .then((response) => {
                setProfileInfo({
                    name: personName,
                    profileImage: response.results[0].image_small_url,
                    text: response.results[0].description,
                });
            })
            .catch((e) => {
                console.error(e);
                setProfileInfoError(true);
            })
            .finally(() => {
                setIsProfileInfoLoading(false);
            });
    }, [personName]);

    useEffect(loadPersonProfile, [loadPersonProfile]);

    return (
        <div className={[styles.hotel, "hotel"].join(" ")}>
            <Helmet>
                <title>
                    {personName} - {t("general:siteName")}
                </title>
            </Helmet>
            {affiliatedHotels && affiliatedHotels.length ? (
                <div className={styles.hotelWrapper}>
                    <div className={styles.info}>
                        <h1>
                            {isMainOligarch && (
                                <SmartLink to="/about">
                                    <Icon img={horseIcon} size="large" className={styles.inlineIcon} />
                                </SmartLink>
                            )}
                            {personName}
                        </h1>

                        {import.meta.env.VITE_FEATURE_FLAG_PERSON_INFO && isProfileInfoLoading ? <LoadingSpinner /> : null}
                        {import.meta.env.VITE_FEATURE_FLAG_PERSON_INFO && !isProfileInfoLoading && !profileInfoError ? (
                            <PersonProfileCard {...profileInfo} />
                        ) : null}

                        {personUrl && (
                            <p>
                                {t("person:dbLink")}: <SmartLink to={personUrl}>{personName}</SmartLink>
                            </p>
                        )}
                        {affiliatedHotels.length > 0 && (
                            <>
                                <div className={styles.hotelRow}>
                                    <Icon img={hotelIcon} size="small" />
                                    <p>{t("person:relatedPlaces")}:</p>
                                </div>
                                <div className={styles.hotelRow}>
                                    <ul>
                                        {affiliatedHotels.map((hotel, key) => (
                                            <AssociatedHotel hotel={hotel} key={key} />
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                        <SmartLink to="/" className={styles.back}>
                            <Icon img={arrowIcon} alt={t("backToMap")} size="large" />
                        </SmartLink>
                    </div>
                    <div className={styles.map}>
                        <Map className="markercluster-map" bounds={bounds}>
                            <TileLayer url={config.map.url} attribution={config.map.attribution} />
                            {getMarkerList({ points: affiliatedHotels })}
                        </Map>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Person;
