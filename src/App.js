import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from "react-router-dom";
import store from './store.js';

import MapView from './views/MapView'
import HotelView from './views/HotelView'

import './App.css';

function App () {
    return (
        <Provider store={store}>
            <div className="App">
                <HashRouter basename="/ner-hotel">
                    <Switch>
                        <Route path="/" exact component={MapView}/>
                        <Route path="/hotel/:id" exact component={HotelView}/>
                    </Switch>
                </HashRouter>
            </div>
        </Provider>
    );
}

export default App;
