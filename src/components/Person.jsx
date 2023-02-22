import { useContext } from "react";
import { Helmet } from "react-helmet";
import { SmartLink } from "./SmartLink";
import { useTranslation } from "react-i18next";
import Leaflet from "leaflet";
import { MapContainer as Map, TileLayer } from "react-leaflet";
import { HotelContext } from "../context";
import { getMarkerList } from "../leaflet-helper.jsx";
import AssociatedHotel from "./person/AssociatedHotel";

import Icon from "./Icon";

import styles from "../css/hotel.module.css";
import arrowIcon from "../assets/arrow-icon.svg";
import hotelIcon from "../assets/hotel-icon.svg";
import horseIcon from "../assets/horse-icon.svg";

import { config } from "../config";
import _getAllHotelsAffiliatedWithPerson from "../utils/person/get-all-hotels-affiliated-with-person";
import getTranslatedKMonitorLink from "../utils/person/get-translated-k-monitor-link";

import PersonProfile from "./person/PersonProfile";

const Person = (props) => {
    const personName = props.name;
    const { t, i18n } = useTranslation();
    const { resolvedLanguage } = i18n;

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

    const DUMMY_PERSON = {
        profileImage: "https://adatbazis.k-monitor.hu/images/persons/3406_b.jpg",
        text: '<strong>Mészáros Lőrinc</strong>&nbsp;(Felcsút, 1966. február 24.) magyar vállalkozó, gázszerelő, 2011-től Felcsút község polgármestere volt a Fidesz–KDNP jelöltjeként, azonban 2018-ban lemondott. Személye jelentős polémiát okozott a politikai és egyéb közbeszédben is, miután az eredetileg gázszerelő Mészáros szinte a semmiből lett néhány év alatt vagyonos, 2016-ra Magyarország 31. leggazdagabb embere, amit sokan a fideszes politikai hátszéllel indokolnak, miután a 2010-es kormányváltást követően duplázódott meg évente a vagyona és lett annak a községnek a polgármestere, ahonnan a választást megnyerő Fidesz elnöke, majd másodszor is miniszterelnök Orbán Viktor is származik, ezért az is elhíresült róla, hogy valójában „Orbán strómanja”. Mészáros emiatt később pert indított az Együtt párt ellen, mert a párt politikusai többször „Orbán strómanjának” nevezték. (<a href="https://hu.wikipedia.org/wiki/M%C3%A9sz%C3%A1ros_L%C5%91rinc_(v%C3%A1llalkoz%C3%B3)">Wikipédia</a>) Mészáros a Napi.hu gazdaglistáján 2017-re&nbsp;<a href="http://index.hu/gazdasag/2017/04/27/100_leggazdagabb_napi.hu_2017/">100 milliárdos vagyonnövekedéssel</a>&nbsp;az 5. helyre ugrott. 2018 óta a leggazdagabb magyarként tartják&nbsp;<a href="https://www.napi.hu/tozsdek-piacok/forbes_meszaros_lorinc_a_leggazdagabb_magyar_egy_ev_alatt_haromszorosara_nott_a_vagyona.675908.html">számon</a>.',
        name: personName,
    };

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

                        {/* TODO: Fill this card with real data */}
                        {/* This UI item is behind a feature flag until we can figure out where to get the data from */}
                        {import.meta.env.VITE_FEATURE_FLAG_PERSON_INFO && <PersonProfile {...DUMMY_PERSON} />}

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
