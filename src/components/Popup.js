import React from 'react';
import styles from '../css/popup.module.css';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import closeIcon from '../assets/close-icon.svg';
import horseIcon from '../assets/horse-icon.svg';
import hotelIcon from '../assets/hotel-icon.svg';
import linkIcon from '../assets/link-icon.svg';
import pinIcon from '../assets/pin-icon.svg';
import store, { closePopup, setSelectedPoint } from '../store';
import { getOligarchData } from '../utils';

const Popup = (props) => {
  const data = props.point.properties;

  const close = () => {
    store.dispatch(setSelectedPoint(null));
    store.dispatch(closePopup());
  };

  const oligarchData = getOligarchData(data.mainOligarch, data.mainCEO);

  return (
    <div className={styles.popup}>
      <div className={styles.popupInner}>
        <div className={styles.close} onClick={() => close()}>
          <Icon img={closeIcon} size="large"/>
        </div>
        <div>
          <h1>{data.name}</h1>
          <div className={styles.popupInfo}>
            <div className={styles.popupRow}>
              <div className={styles.popupCol}>
                <span>Üzemeltető</span>
                <div className={styles.popupRow}>
                  <Icon img={hotelIcon} size="small"/>
                  <p>{data.company}</p>
                </div>
              </div>
              <div className={styles.popupCol}>
                <span>NER lovag</span>
                <div className={styles.popupRow}>
                  <Icon img={horseIcon} size="small"/>
                  <div className={styles.oligarch}>
                    {oligarchData.map(oligarch => (
                        <>
                          <p><a href={oligarch.data.link} target="_blank">{oligarch.name}</a><br/><span>{oligarch.data.type}</span></p>
                        </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span>Cím</span>
              <div className={styles.popupRow}>
                <Icon img={pinIcon} size="small"/>
                <p>{data.address}</p>
              </div>
            </div>
            {data.link !== '' && (<div className={styles.popupRow}>
              <Icon img={linkIcon} size="small"/>
              <a href={data.link} target="_blank">kapcsolódó cikk</a>
            </div>)}
          </div>
          {}
          <Link to={`/hotel/${data.id}`} className={styles.moreButton}>részletek</Link>

        </div>
      </div>
    </div>
  );
};

export default Popup;
