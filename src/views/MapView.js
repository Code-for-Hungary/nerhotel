import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import MapComponent from '../components/Map.js';
import Header from '../components/Header.js';
import List from '../components/List.js';
import Menu from '../components/Menu';
import store, { closeMenu } from '../store';

const MapView = (props) => {
  useEffect(() => {
    store.dispatch(closeMenu());
  }, []);

  return (
    <div>
      <Header withSearch={true} history={props.history}/>
      <Menu/>
      <MapComponent/>
      {props.showList && <List/>}
    </div>
  );
};

const mapStateToProps = state => ({
  showList: state.showList
});

export default connect(mapStateToProps)(MapView);
