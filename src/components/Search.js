import React from 'react';
import store, {setList, openList, closeList} from '../store.js'
import styles from '../css/search.module.css'

import places from '../data/places.json'

class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            results: []
        }
        this.search = this.search.bind(this)
    }

    search(e) {
        if (e.key === 'Enter') {
            const value = e.target.value.toLowerCase()
            const results = places.filter(place => (this.findProperty(place.properties, value)))
            store.dispatch(setList(results))
            store.dispatch(openList())
        }

        if (e.key === 'Escape' || e.target.value === '') {
            store.dispatch(closeList())
            store.dispatch(setList([]))
        }
    }

    findProperty(place, phrase) {
        console.log(place)
        let foundOligarch = []
        if (place.oligarch.length > 0) {
            foundOligarch = place.oligarch.filter(ol => (
                ol.toLowerCase().indexOf(phrase) > -1
            ))
        }
        return ((place.address && place.address.toLowerCase().indexOf(phrase) > -1)
            || (place.name && place.name.toLowerCase().indexOf(phrase) > -1)
            || (foundOligarch.length > 0)
        )
    }

    render() {
        return (
            <div className={styles.form}>
                <input onKeyUp={this.search} className={styles.input} placeholder="keress név, hely, oligarcha szerint"/>
            </div>
        );
    }
}

export default Search;
