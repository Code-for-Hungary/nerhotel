import React  from 'react';
import Header from '../components/Header.js';
import Hotel from '../components/Hotel.js';
import Menu from '../components/Menu';

const HotelView = (props) => {
  return (
    <div>
      <Header history={props.history}/>
      <Menu/>
      <Hotel id={props.match.params.id} history={props.history}/>
    </div>
  );
};

export default HotelView;
