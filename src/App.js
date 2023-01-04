import { useEffect, useState, useReducer } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import {Helmet} from 'react-helmet';

import './App.css';

import HotelView from './views/HotelView';
import MapView from './views/MapView';
import ContentPageView from './views/ContentPageView';
import PersonView from './views/PersonView';
import ErrorView from './views/ErrorView';
import ErrorBoundary from './components/ErrorBoundary';

import { MapContext, HotelContext } from './context';
import reducer, { initialState } from './reducer';
import { useTranslation } from 'react-i18next';
import { config } from './config';

import loadHotelDataFromCsv from './utils/load-hotel-data-from-csv';

function App () {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mapData = { ...state, dispatch};
  const { i18n, t } = useTranslation();
  const [ hotels, setHotels ] = useState([]);
  
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

  useEffect(() => {
    let isSubscribed = true;

    loadHotelDataFromCsv().then(data => {
      if(isSubscribed) {
        setHotels(data);
      }
    }).catch(e => {
      console.error(e);
    })

    return () => {
      isSubscribed = false;
    }
  }, []);

  return (
    <>
      <ErrorBoundary>
        <Helmet>
          <title>{t('general:tagline')} - {t('general:siteName')}</title>
        </Helmet>
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
                <Route path="*" component={ErrorView} />
              </Switch>
            </HashRouter>
          </MapContext.Provider>
        </HotelContext.Provider>
      </ErrorBoundary>
    </>
  );
}

export default App;
