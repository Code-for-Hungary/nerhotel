import React from 'react';
import store, { setList, openList, closeList } from '../store.js';
import styles from '../css/search.module.css';

import places from '../data/places.json';

class Search extends React.Component {
    constructor () {
        super();
        this.state = {value: ''};
        this.onKeyUp = this.onKeyUp.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onKeyUp (e) {
        const value = e.target.value;

        if (e.key === 'Escape' || value === '') {
            store.dispatch(closeList());
            store.dispatch(setList([]));
        }

        this.setState({value});
    }

    handleSubmit (e) {
        e.preventDefault();
        const results = places.filter(place => (this.findProperty(place.properties, this.state.value)));
        store.dispatch(setList(results));
        store.dispatch(openList());
    }

    findProperty (place, phrase) {
        let foundOligarch = [];
        if (place.oligarchs.length > 0) {
            foundOligarch = place.oligarchs.filter(ol => (
                ol.name.toLowerCase().indexOf(phrase) > -1
            ));
        }
        return ((place.address && place.address.toLowerCase().indexOf(phrase) > -1)
            || (place.name && place.name.toLowerCase().indexOf(phrase) > -1)
            || (foundOligarch.length > 0)
        );
    }

    render () {
        return (
            <div className={styles.form}>
                <form onSubmit={this.handleSubmit}>
                    <input onKeyUp={this.onKeyUp} className={styles.input}
                           placeholder="keress név, hely, oligarcha szerint"/>
                </form>
            </div>
        );
    }
}

export default Search;
