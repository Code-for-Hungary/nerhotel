import React from 'react';
import styles from '../css/list.module.css';
import Icon from './Icon.js';

import closeIcon from '../assets/close-icon.svg';
import horseIcon from '../assets/horse-icon.svg';
import pinIcon from '../assets/pin-icon.svg';

import { MapContext } from '../context';


const ListItem = ({ item }) => {
  const oligarchs = item.properties.mainOligarch.length > 0 ?
    item.properties.mainOligarch : item.properties.oligarchs;

  return (<>
    <h1>{item.properties.name}</h1>
    <div className={styles.listItemRow}>
      <div className={styles.listItemCol}>
        <Icon img={horseIcon} size="small"/>
        <div className={styles.oligarchList}>
          {oligarchs.map((oligarch, key) => (
              <p key={key}>
                {oligarch.link ? (
                  <a href={oligarch.link} target="_blank" rel="noopener noreferrer">{oligarch.name}</a>):
                  oligarch.name
                }
              </p>
          ))}
        </div>
      </div>
      <div className={styles.listItemCol}>
        <Icon img={pinIcon} size="small"/>
        <p>{item.properties.address}</p>
      </div>
    </div>
  </>)
};

function List() {
  const { dispatch, list, map } = React.useContext(MapContext);

  const showItem = React.useCallback((item) => () => {
    const [lat, lng] = item.geometry.coordinates;
    if (map) {
      map.setView([lat, lng], 18);
    }
    dispatch({ type: 'SetCenter', center: [lat, lng] });
    dispatch({ type: 'SetSelectedPoint', point: item });
    dispatch({ type: 'ToggleList', showList: false });
    dispatch({ type: 'TogglePopup', showPopup: true });
  }, [map, dispatch]);

  const closeList = React.useCallback(() => {
      dispatch({ type: 'ToggleList', showList: false });
  }, [dispatch]);

  return (
    <div className={styles.list}>
      <div className={styles.closeButton} onClick={closeList}>
        <Icon img={closeIcon} size="large"/>
      </div>
      <div className={styles.listWrapper}>
        {list && list.length > 0 && list.map((item, key) => (
          <div key={key} className={styles.listItem} onClick={showItem(item)}>
            <ListItem item={item}/>
          </div>
        ))}

        {list.length === 0 && (
          <p>Adatbázisunkban nincsen megfelelő szállás- vagy vendéglátóhely. Ha tudsz egy politikaközeli helyet, <a href="https://docs.google.com/forms/d/e/1FAIpQLSdi6uNP-ML46outzCbOifdwKefAaB1x_j9eXMzeTJYGB5NEnA/viewform">küldd el nekünk
          </a>!</p>
        )}
      </div>
    </div>
  );
}

export default List;
