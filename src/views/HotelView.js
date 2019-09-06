import React from 'react';
import Header from '../components/Header.js';
import Hotel from '../components/Hotel.js';

const HotelView = (props) => (
  <div>
    <Header/>
    <Hotel id={props.match.params.id} history={props.history}/>
  </div>
);

export default HotelView;
