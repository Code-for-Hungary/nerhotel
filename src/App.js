import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import store from './store.js';

import HotelView from './views/HotelView';
import MapView from './views/MapView';
import AboutView from './views/AboutView';
import ContactView from './views/ContactView';

function App () {
    return (
        <Provider store={store}>
            <div className="App">
                <HashRouter>
                    <Switch>
                        <Route path="/" exact component={MapView}/>
                        <Route path="/hotel/:id" exact component={HotelView}/>
                        <Route path="/about" exact component={AboutView}/>
                        <Route path="/contact" exact component={ContactView}/>
                    </Switch>
                </HashRouter>
            </div>
        </Provider>
    );
}

export default App;
