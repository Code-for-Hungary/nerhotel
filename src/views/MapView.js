import React from 'react';
import MapComponent from '../components/Map.js';
import Layout from './Layout';

const MapView = (props) => {
  return (
    <Layout withSearch={true} withList={true} history={props.history}>
      <MapComponent/>
    </Layout>
  );
};


export default MapView;
