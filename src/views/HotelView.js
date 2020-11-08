import React from 'react';
import Layout from './Layout';
import Hotel from '../components/Hotel.js';

const HotelView = (props) => {
  return (
    <Layout history={props.history}>
      <Hotel id={props.match.params.id} history={props.history}/>
    </Layout>
  );
};

export default HotelView;
