import React from 'react';
import styles from '../css/search.module.css';

import { MapContext, HotelContext } from '../context';

/**
 * @param {{name: string, address: string, mainOligarch: {name: string}[]}} place
 * @param {string} phrase
 * @returns {*|boolean}
 */
function findProperty(place, phrase) {
    let foundOligarch = [];
    if (place.mainOligarch.length > 0) {
      foundOligarch = place.mainOligarch.filter(oligarch => {
        return (oligarch.name.toLowerCase().includes(phrase) ||
          removeAccents(oligarch.name).includes(phrase));
      });
    }
    const foundPlace = place.name &&
      (place.name.toLowerCase().includes(phrase) ||
      removeAccents(place.name).includes(phrase));
    const foundAddress = place.address &&
      (place.address.toLowerCase().includes(phrase) ||
      removeAccents(place.address).includes(phrase));


    return (foundPlace || foundAddress || foundOligarch.length > 0);
  }

/**
 * Source: https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript#answer-37511463
 *
 * @param {string} string
 * @returns {string}
 */
function removeAccents(string) {
  return string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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
