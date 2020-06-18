import React from 'react';
import styles from '../css/popup.module.css';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import closeIcon from '../assets/close-icon.svg';
import horseIcon from '../assets/horse-icon.svg';
import hotelIcon from '../assets/hotel-icon.svg';
import linkIcon from '../assets/link-icon.svg';
import pinIcon from '../assets/pin-icon.svg';
import { getOligarchData } from '../utils';
import { MapContext } from '../context';


const Popup = (props) => {
  const { dispatch } = React.useContext(MapContext);
  const data = props.point.properties;

  const close = React.useCallback(() => {
    dispatch({ type: 'SetSelectedPoint', point: null });
    dispatch({ type: 'TogglePopup', showPopup: false });
  }, [dispatch]);

  const mainOligarchs = getOligarchData(data.mainOligarch, data.mainCEO);
  const simpleOligarchs = getOligarchData(data.oligarchs || [], data.ceos || []);
  const oligarchsToShow = mainOligarchs.length > 0 ? mainOligarchs : simpleOligarchs;

  return (
    <div className={styles.popup}>
      <div className={styles.popupInner}>
        <div className={styles.close} onClick={() => close()}>
          <Icon img={closeIcon} size="large"/>
        </div>
        <>
          <h1>{data.name}</h1>
          <div className={styles.popupInfo}>
            <div className={styles.popupRow}>
              <div className={styles.popupCol}>
                <span>Üzemeltető</span>
                <div className={styles.popupRow}>
                  <Icon img={hotelIcon} size="small"/>
                  <div className={styles.company}>
                    {data.company.link ?
                    <p><a href={data.company.link} target="_blank" rel="noopener noreferrer">{data.company.name}</a></p> :
                    <p>{data.company.name}</p>}
                  </div>
                </div>
              </div>

              {oligarchsToShow && oligarchsToShow.length > 0 &&
              (<div className={styles.popupCol}>
                <span>PEP</span>
                <div className={styles.popupRow}>
                  <Icon img={horseIcon} size="small"/>
                  <div className={styles.oligarch}>
                    {oligarchsToShow.map((oligarch, key) => (
                      <div key={key}>
                        {oligarch.data.link !== '' ? (
                           <a href={oligarch.data.link} target="_blank"
                           rel="noopener noreferrer">{oligarch.name}</a>
                        ) : (
                          <p>{oligarch.name}</p>
                        )}
                        <span>{oligarch.data.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>)}

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
              <a href={data.link} target="_blank" rel="noopener noreferrer">
                kapcsolódó cikk
              </a>
            </div>)}
          </div>
          {}
          <Link to={`/hotel/${data.id}`} className={styles.moreButton}>részletek</Link>
        </>
      </div>
    </div>
  );
};

export default Popup;
