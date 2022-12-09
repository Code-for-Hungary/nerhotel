import React, { useEffect } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import HotelView from './views/HotelView';
import MapView from './views/MapView';
import ContentPageView from './views/ContentPageView';
import PersonView from './views/PersonView';
import DataImportView from './views/DataImportView';
import ErrorView from './views/ErrorView';
import ErrorBoundary from './components/ErrorBoundary';

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
      <ErrorBoundary>
        <HotelContext.Provider value={{hotels}}>
          <MapContext.Provider value={mapData}>
            <HashRouter>
              <Switch>
                <Route path="/" exact component={MapView} />
                <Route path="/hotel/:id" exact component={HotelView} />
                <Route path="/about" exact component={ContentPageView} />
                <Route path="/contact" exact component={ContentPageView} />
                <Route path="/person/:name" exact component={PersonView} />
                <Route path="/data-export" exact component={ContentPageView} />
                <Route path="/data-import" exact component={DataImportView} />
                <Route path="*" component={ErrorView} />
              </Switch>
            </HashRouter>
          </MapContext.Provider>
        </HotelContext.Provider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
