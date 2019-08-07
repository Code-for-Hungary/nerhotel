import React from 'react'
import { Link } from "react-router-dom";
import Icon from './Icon.js'

import styles from '../css/hotel.module.css'

import places from '../data/places.json'
import arrowIcon from '../assets/arrow-icon.svg';
import horseIcon from '../assets/horse-icon.svg';
import hotelIcon from '../assets/hotel-icon.svg';
import linkIcon from '../assets/link-icon.svg';
import pinIcon from '../assets/pin-icon.svg';

import store, {closePopup} from '../store';

const Hotel = (props) => {
    const hotelById = places.find(item => item.properties.id === parseInt(props.id))
    const data = hotelById.properties

    const goBack = () => {
        store.dispatch(closePopup())
        props.history.push('/');
    }

    return (
        <div className={styles.hotel}>
            <div>
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
                    <p>NER lovag: <span>{data.oligarch}</span></p>
                </div>
                <div className={styles.hotelRow}>
                    <Icon img={pinIcon} size="small"/>
                    <p>Cím: <span>{data.address}</span></p>
                </div>
                {data.link !== "" && (<div className={styles.hotelRow}>
                    <Icon img={linkIcon} size="small"/>
                    <a href={data.link}><span>Kapcsolódó cikk</span></a>
                </div>)}
            </div>
            <div className={styles.back} onClick={() => goBack()}>
                <Icon img={arrowIcon} size="large"/>
            </div>
        </div>
    )
}

export default Hotel
