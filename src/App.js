import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import HotelView from './views/HotelView';
import MapView from './views/MapView';
import AboutView from './views/AboutView';
import ContactView from './views/ContactView';

import { MapContext, HotelContext } from './context';
import reducer, { initialState } from './reducer';

import hotels from './data/nerhotel.json';

function App () {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const mapData = { ...state, dispatch};

  return (
    <div className="App">
      <HotelContext.Provider value={{hotels}}>
        <MapContext.Provider value={mapData}>
          <HashRouter>
            <Switch>
              <Route path="/" exact component={MapView}/>
              <Route path="/hotel/:id" exact component={HotelView}/>
              <Route path="/about" exact component={AboutView}/>
              <Route path="/contact" exact component={ContactView}/>
            </Switch>
          </HashRouter>
        </MapContext.Provider>
      </HotelContext.Provider>
    </div>
  );
}

export default App;
