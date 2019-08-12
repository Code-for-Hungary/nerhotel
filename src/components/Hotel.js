import React from 'react'
import { Map as LeafletMap, Marker, TileLayer } from 'react-leaflet';
import Icon from './Icon.js'

import styles from '../css/hotel.module.css'

import places from '../data/places.json'
import arrowIcon from '../assets/arrow-icon.svg';
import horseIcon from '../assets/horse-icon.svg';
import hotelIcon from '../assets/hotel-icon.svg';
import linkIcon from '../assets/link-icon.svg';
import pinIcon from '../assets/pin-icon.svg';

import store, {closePopup} from '../store';
import L from 'leaflet';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import orangeIcon from '../assets/marker-icon-orange.svg';

import {getOligarchData} from '../utils'


const Hotel = (props) => {
    const hotelById = places.find(item => item.properties.id === parseInt(props.id))
    const data = hotelById.properties
    const [lat, lng] = hotelById.geometry.coordinates

    const icon = L.icon({
        iconUrl: orangeIcon,
        shadowUrl: iconShadow,
        iconSize: [40, 62],
        iconAnchor: [20, 52],
        shadowSize: [40, 62],
        shadowAnchor: [12, 62]
    })

    const goBack = () => {
        store.dispatch(closePopup())
        props.history.push('/');
    }

    const oligarchData = getOligarchData(data)


    return (
        <div className={[styles.hotel, 'hotel'].join(' ')}>
            <div className={styles.hotelWrapper}>
                <div className={styles.info}>
                    <h1>{data.name}</h1>
                    <div className={styles.hotelRow}>
                        <p>Ingatlan típusa: <span>{data.type}</span></p>
                    </div>
                    <div className={styles.hotelRow}>
                        <Icon img={hotelIcon} size="small"/>
                        <p>Üzemeltető: <span>{data.company}</span></p>
                    </div>
                    <div className={styles.hotelRow}>
                        <Icon img={horseIcon} size="small"/>
                        <p>NER lovag:<br/>
                          {oligarchData.map(ol => (<span>{ol.name}<span className={styles.title}> ({ol.type})</span><br/></span>))}
                        </p>
                    </div>
                    <div className={styles.hotelRow}>
                        <Icon img={pinIcon} size="small"/>
                        <p>Cím: <span>{data.address}</span></p>
                    </div>
                    {data.link !== "" && (<div className={styles.hotelRow}>
                        <Icon img={linkIcon} size="small"/>
                        <a href={data.link} target="_blank"><span>Kapcsolódó cikk</span></a>
                    </div>)}
                    <div className={styles.back} onClick={() => goBack()}>
                        <Icon img={arrowIcon} size="large"/>
                    </div>
                </div>
                <div className={styles.map}>
                    <LeafletMap className="markercluster-map" center={[lat, lng]} zoom={17} maxZoom={19} zoomControl={false}>
                        <TileLayer
                            url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
                            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>"
                        />
                        <Marker position={[lat, lng]} icon={icon}/>
                    </LeafletMap>
                </div>
            </div>
        </div>
    )
}

export default Hotel
