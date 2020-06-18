import React from 'react';
import store, { setList, openList, closeList, closePopup } from '../store.js';
import styles from '../css/search.module.css';

import places from '../data/nerhotel.json';

class Search extends React.Component {
  constructor () {
    super();
    this.state = {value: ''}
    this.search = this.search.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  search(e) {
    e.preventDefault();
    store.dispatch(closePopup());

    const value = this.state.value.toLowerCase();
    const results = places.filter(place => (this.findProperty(place.properties, value)));
    store.dispatch(setList(results));
    store.dispatch(openList());
  }

  onKeyUp(e) {
    const value = e.target.value;
    if (e.key === 'Escape' || value === '') {
      store.dispatch(closeList());
      store.dispatch(setList([]));
    }

    this.setState({value})
  }

  findProperty(place, phrase) {
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

  render () {
    return (
      <div className={styles.form}>
        <form onSubmit={this.search}>
          <input onKeyUp={this.onKeyUp} className={styles.input} placeholder="keress név, hely, személy szerint"/>
        </form>
      </div>
    );
  }
}

export default Search;
