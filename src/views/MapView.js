import React from 'react'
import { connect } from 'react-redux';

import MapComponent from '../components/Map.js';
import Header from '../components/Header.js';
import List from '../components/List.js';


const MapView = (props) => (
    <div>
        <Header withSearch={true}/>
        <MapComponent/>
        {props.showList && <List/>}
    </div>
)


const mapStateToProps = state => ({
    showList: state.showList
})

export default connect(mapStateToProps)(MapView)