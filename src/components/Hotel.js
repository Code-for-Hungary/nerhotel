import { useContext } from "react";
import { MapContainer as LeafletMap, Marker, TileLayer } from "react-leaflet";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { SmartLink } from "./SmartLink.js";
import Icon from "./Icon.js";

import { getOligarchData } from "../utils";
import { MapContext, HotelContext } from "../context";
import { createOrangeIcon } from "../leaflet-helper.js";
import getTranslatedHotelProperty from "../utils/get-translated-hotel-property.js";

import styles from "../css/hotel.module.css";

import arrowIcon from "../assets/arrow-icon.svg";
import horseIcon from "../assets/horse-icon.svg";
import hotelIcon from "../assets/hotel-icon.svg";
import linkIcon from "../assets/link-icon.svg";
import pinIcon from "../assets/pin-icon.svg";

import { config } from "../config.js";
import goBack from "../utils/hotel/go-back.js";
import displayTranslatedPersonType from "../utils/person/display-translated-person-type.js";

const icon = createOrangeIcon();

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
const Hotel = (props) => {
  const { dispatch } = useContext(MapContext);
  const { hotels } = useContext(HotelContext);
  const { t, i18n } = useTranslation();
  const { resolvedLanguage } = i18n;
  const hotelById = hotels.length
    ? hotels.find((hotel) => hotel.properties.id === parseInt(props.id))
    : null;
  const data = hotelById ? hotelById.properties : null;
  const location = hotelById ? hotelById.geometry.coordinates : null;
  const oligarchData = hotelById
    ? getOligarchData(data.oligarchs || [], data.ceos || [])
    : null;

  return (
    <div className={[styles.hotel, "hotel"].join(" ")}>
      <div className={styles.hotelWrapper}>
        <div className={styles.info}>
          {data ? (
            <>
              <Helmet>
                <title>
                  {getTranslatedHotelProperty("name", resolvedLanguage, data)} -{" "}
                  {t("general:siteName")}
                </title>
              </Helmet>
              <h1>
                {getTranslatedHotelProperty("name", resolvedLanguage, data)}
              </h1>
              <div className={styles.hotelRow}>
                <p>
                  {t("hotel:type")}:{" "}
                  <span>
                    {getTranslatedHotelProperty("type", resolvedLanguage, data)}
                  </span>
                </p>
              </div>
              {data.company && (
                <div className={styles.hotelRow}>
                  <Icon img={hotelIcon} size="small" />
                  <p>
                    {t("general:maintainer")}:{" "}
                    {data.company.link ? (
                      <span>
                        <SmartLink to={data.company.link}>
                          {data.company.name}
                        </SmartLink>
                      </span>
                    ) : (
                      <span>{data.company.name}</span>
                    )}
                  </p>
                </div>
              )}
              {oligarchData && (
                <div className={styles.hotelRow}>
                  <Icon img={horseIcon} size="small" />
                  <p>
                    {t("hotel:people")}:<br />
                    {oligarchData.map((oligarch, key) => (
                      <span key={key} className={styles.oligarch}>
                        <SmartLink to={`/person/${oligarch.name}`}>
                          {oligarch.name}
                        </SmartLink>
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
              {data.address && (
                <div className={styles.hotelRow}>
                  <Icon img={pinIcon} size="small" />
                  <p>
                    {t("general:address")}: <span>{data.address}</span>
                  </p>
                </div>
              )}
              {data.link !== "" && (
                <div className={styles.hotelRow}>
                  <Icon img={linkIcon} size="small" />
                  <SmartLink
                    to={getTranslatedHotelProperty(
                      "link",
                      resolvedLanguage,
                      data
                    )}
                  >
                    <span>{t("general:article")}</span>
                  </SmartLink>
                </div>
              )}
              {data.details !== "" && (
                <div className={styles.hotelRow}>
                  <p>
                    <span>{t("general:additionalInfo")}:</span>
                    <br />
                    {getTranslatedHotelProperty(
                      "details",
                      resolvedLanguage,
                      data
                    )}
                  </p>
                </div>
              )}
              {data.date !== "" && (
                <div className={styles.hotelRow}>
                  <p>
                    {t("hotel:updatedOn")}: <span>{data.date}</span>
                  </p>
                </div>
              )}
            </>
          ) : null}

          <SmartLink
            className={styles.back}
            onClick={() => {
              goBack(dispatch, hotelById, location);
            }}
            to="/"
          >
            <Icon img={arrowIcon} alt={t("backToMap")} size="large" />
          </SmartLink>
        </div>
        <div className={styles.map}>
          {location ? (
            <LeafletMap
              className="markercluster-map"
              center={location}
              zoom={config.map.closeZoomLevel}
            >
              <TileLayer
                url={config.map.url}
                attribution={config.map.attribution}
              />
              <Marker position={location} icon={icon} />
            </LeafletMap>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Hotel;
