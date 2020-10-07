import React from 'react';
import {Map as LeafletMap, Marker, TileLayer} from 'react-leaflet';
import {Link} from "react-router-dom";
import Icon from './Icon.js';

import styles from '../css/hotel.module.css';

import arrowIcon from '../assets/arrow-icon.svg';
import horseIcon from '../assets/horse-icon.svg';
import hotelIcon from '../assets/hotel-icon.svg';
import linkIcon from '../assets/link-icon.svg';
import pinIcon from '../assets/pin-icon.svg';

import L from 'leaflet';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import orangeIcon from '../assets/marker-icon-orange.svg';

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
 * @property {{name: string, link: string}} properties.mainOligarch
 */

const Hotel = (props) => {
  const {dispatch} = React.useContext(MapContext);
  const {hotels} = React.useContext(HotelContext);
  const hotelById = hotels.find(hotel => hotel.properties.id === parseInt(props.id));
  const data = hotelById.properties;
  const [lat, lng] = hotelById.geometry.coordinates;

  const goBack = () => {
      props.history.push('/');
      dispatch({type: 'SetSelectedPoint', point: hotelById});
      dispatch({type: 'SetCenter', center: [lat, lng]});
    }
  ;

  const oligarchData = getOligarchData(data.oligarchs, data.ceos);

  return (
    <div className={[styles.hotel, 'hotel'].join(' ')}>
      <div className={styles.hotelWrapper}>
        <div className={styles.info}>
          <h1>{data.name}</h1>
          <div className={styles.hotelRow}>
            <p>Hely típusa: <span>{data.type}</span></p>
          </div>
          {data.company && (
            <div className={styles.hotelRow}>
              <Icon img={hotelIcon} size="small"/>
              <p>Üzemeltető:
                {data.company.link ?
                  <span><a href={data.company.link} target="_blank" rel="noopener noreferrer">{data.company.name}</a></span> :
                  <span>{data.company.name}</span>}
              </p>
            </div>
          )}
          {oligarchData && oligarchData.length > 0 && (
            <div className={styles.hotelRow}>
              <Icon img={horseIcon} size="small"/>
              <p>Kapcsolódó személyek:<br/>
                {oligarchData.map((oligarch, key) => (
                  <span key={key} className={styles.oligarch}>
                     <Link to={`/person/${oligarch.name}`}>{oligarch.name}</Link>
                    <span className={styles.title}> ({oligarch.data.type})</span><br/>
                  </span>
                ))}
              </p>
            </div>
          )}
          {data.address && (
            <div className={styles.hotelRow}>
              <Icon img={pinIcon} size="small"/>
              <p>Cím: <span>{data.address}</span></p>
            </div>
          )}
          {data.link !== '' && (
            <div className={styles.hotelRow}>
              <Icon img={linkIcon} size="small"/>
              <a href={data.link} target="_blank" rel="noopener noreferrer"><span>Kapcsolódó cikk</span></a>
            </div>
          )}
          {data.details !== '' && (
            <div className={styles.hotelRow}>
              <p><span>Kapcsolódó információ:</span><br/>{data.details}</p>
            </div>
          )}
          {data.date !== '' && (
            <div className={styles.hotelRow}>
              <p>Adatok frissítve: <span>{data.date}</span></p>
            </div>
          )}
          <div className={styles.back} onClick={goBack}>
            <Icon img={arrowIcon} size="large"/>
          </div>
        </div>
        <div className={styles.map}>
          <LeafletMap className="markercluster-map" center={[lat, lng]} zoom={17} maxZoom={19}
                      zoomControl={false}>
            <TileLayer
              url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>"
            />
            <Marker position={[lat, lng]} icon={icon}/>
          </LeafletMap>
        </div>
      </div>
    </div>
  );
};

export default Hotel;
