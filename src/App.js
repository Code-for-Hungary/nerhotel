import React, { useEffect } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import HotelView from './views/HotelView';
import MapView from './views/MapView';
import AboutView from './views/AboutView';
import ContactView from './views/ContactView';
import PersonView from './views/PersonView';
import DataExportView from './views/DataExportView';
import DataImportView from './views/DataImportView';

import { MapContext, HotelContext } from './context';
import reducer, { initialState } from './reducer';
import { useTranslation } from 'react-i18next';
import { config } from './config';

import hotels from './data/nerhotel.json';

function App () {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const mapData = { ...state, dispatch};
  const { i18n } = useTranslation();
  
  useEffect(()=> {
    const queryString = window.location.href.split('?')[1];
    const urlParamsObj = new URLSearchParams(queryString);

    let preferredLang;
    if(urlParamsObj.has(config.locales.paramName)) {
      preferredLang = urlParamsObj.get(config.locales.paramName)
    } else {
      preferredLang = localStorage.getItem(config.locales.paramName);
    }

    if(
      preferredLang && 
      config.locales.available.includes(preferredLang) &&
      preferredLang !== i18n.options.lng
    ) {
      i18n.changeLanguage(preferredLang);
      localStorage.setItem(config.locales.paramName, preferredLang);
    }
  }, [i18n]);

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
              <Route path="/person/:name" exact component={PersonView}/>
              <Route path="/data-export" exact component={DataExportView}/>
              <Route path="/data-import" exact component={DataImportView}/>
            </Switch>
          </HashRouter>
        </MapContext.Provider>
      </HotelContext.Provider>
    </div>
  );
}

export default App;
