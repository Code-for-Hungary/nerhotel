import React from 'react';
import styles from '../css/search.module.css';

import { MapContext, HotelContext } from '../context';

function findProperty(place, phrase) {
    let foundOligarch = [];
    if (place.mainOligarch.length > 0) {
      foundOligarch = place.mainOligarch.filter(oligarch => {
        return oligarch.name.toLowerCase().indexOf(phrase) > -1;
      });
    }
    return ((place.address && place.address.toLowerCase().indexOf(phrase) > -1) ||
      (place.name && place.name.toLowerCase().indexOf(phrase) > -1) ||
      foundOligarch.length > 0
    );
  }

function Search() {
  const {dispatch} = React.useContext(MapContext);
  const {hotels} = React.useContext(HotelContext);
  const [value, setValue] = React.useState('');

  const onSearchCallback = React.useCallback((e) => {
    e.preventDefault();
    dispatch({ type: 'TogglePopup', showPopup: false });

    const results = hotels.filter(hotel => (findProperty(hotel.properties, value.toLowerCase())));
    dispatch({ type: 'SetList', list: results });
    dispatch({ type: 'ToggleList', showList: true });
  }, [dispatch, hotels, value]);

  const onKeyUpCallback = React.useCallback((e) => {
    setValue(e.target.value);
    if (e.key === 'Escape' || value === '') {
      dispatch({ type: 'SetList', list: [] });
      dispatch({ type: 'ToggleList', showList: false });
    }
  }, [value, dispatch]);

  return (
    <div className={styles.form}>
      <form onSubmit={onSearchCallback}>
        <input onKeyUp={onKeyUpCallback} className={styles.input} placeholder="keress név, hely, személy szerint"/>
      </form>
    </div>
  );
}

export default Search;
