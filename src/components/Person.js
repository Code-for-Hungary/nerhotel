import React from 'react';
import {Link} from "react-router-dom";
import Leaflet from "leaflet";
import {Map, TileLayer} from 'react-leaflet';
import {HotelContext} from '../context';
import {getMarkerList} from '../leaflet-helper.js';

import Icon from './Icon.js';

import styles from '../css/hotel.module.css';
import arrowIcon from '../assets/arrow-icon.svg';
import hotelIcon from '../assets/hotel-icon.svg';

const Person = (props) => {
  const personName = props.name;

  const hotelContext = React.useContext(HotelContext);
  /** @type {Hotel[]} */
  const hotels = hotelContext.hotels;

  const affiliatedHotels = hotels.filter(hotel => hotel.properties.oligarchs.find(oligarch => oligarch.name === personName));

  const personLink = affiliatedHotels.length ? affiliatedHotels[0].properties.oligarchs.find(oligarch => oligarch.name === personName).link : '';

  const bounds = new Leaflet.LatLngBounds(affiliatedHotels.map(hotel => ([hotel.geometry.coordinates[0], hotel.geometry.coordinates[1]])));

  const goBack = () => {
      props.history.push('/');
    }
  ;

  return (
    <div className={[styles.hotel, 'hotel'].join(' ')}>
      <div className={styles.hotelWrapper}>
        <div className={styles.info}>
          <h1>{personName}</h1>
          {personLink && <p>K-Monitor link: <a href={personLink} target="_blank" rel="noopener noreferrer">{personName}</a></p>}
          {(affiliatedHotels.length > 0) && (
            <>
              <div className={styles.hotelRow}>
                <Icon img={hotelIcon} size="small"/>
                <p>Kapcsolódó helyszínek:</p>
              </div>
              <div className={styles.hotelRow}>
                <ul>
                  {affiliatedHotels.map((hotel, key) => (
                    <li key={key} className={styles.oligarch}>
                        <Link to={`/hotel/${hotel.properties.id}`}>{hotel.properties.name}</Link>
                      <span className={styles.title}> ({hotel.properties.type})</span>{hotel.properties.address && ` – ${hotel.properties.address}`}{hotel.properties.date && (<> – <span>Adat frissítve:</span> {hotel.properties.date}</>)}
                      {hotel.properties.details && (
                        <p><span>Kapcsolódó információ:</span> {hotel.properties.details}</p>)}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
          <div className={styles.back} onClick={goBack}>
            <Icon img={arrowIcon} size="large"/>
          </div>
        </div>
        <div className={styles.map}>
          <Map className="markercluster-map" bounds={bounds} maxZoom={19}>
            <TileLayer
              url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>"
            />
            {getMarkerList({points: affiliatedHotels})}
          </Map>
        </div>
      </div>
    </div>
  );
};

export default Person;
