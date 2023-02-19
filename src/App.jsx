import { useEffect, useState, useReducer, lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";

import "./App.css";

import ErrorBoundary from "./components/ErrorBoundary";
import AnalyticsWrapper from "./components/analytics/AnalyticsWrapper";

import { MapContext, HotelContext } from "./context";
import reducer, { initialState } from "./reducer";
import { useTranslation } from "react-i18next";
import { config } from "./config";

import loadHotelDataFromCsv from "./utils/load-hotel-data-from-csv";
import LoadingSpinner from "./components/LoadingSpinner";
import LegacyHashRouteRedirect from "./components/routing/LegacyHashRouteRedirect";

const HotelView = lazy(() => import("./views/HotelView"));
const MapView = lazy(() => import("./views/MapView"));
const ContentPageView = lazy(() => import("./views/ContentPageView"));
const PersonView = lazy(() => import("./views/PersonView"));
const ErrorView = lazy(() => import("./views/ErrorView"));

function HotelPage(props) {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <HotelView {...props} />
        </Suspense>
    );
}

function MapPage(props) {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <MapView {...props} />
        </Suspense>
    );
}

function ContentPage(props) {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <ContentPageView {...props} />
        </Suspense>
    );
}

function PersonPage(props) {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <PersonView {...props} />
        </Suspense>
    );
}

function ErrorPage(props) {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <ErrorView {...props} />
        </Suspense>
    );
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const mapData = { ...state, dispatch };
    const { i18n, t } = useTranslation();
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const queryString = window.location.href.split("?")[1];
        const urlParamsObj = new URLSearchParams(queryString);

        let preferredLang;
        if (urlParamsObj.has(config.locales.paramName)) {
            preferredLang = urlParamsObj.get(config.locales.paramName);
        } else {
            preferredLang = localStorage.getItem(config.locales.paramName);
        }

        if (preferredLang && config.locales.available.includes(preferredLang) && preferredLang !== i18n.options.lng) {
            i18n.changeLanguage(preferredLang);
            localStorage.setItem(config.locales.paramName, preferredLang);
        }
    }, [i18n]);

    useEffect(() => {
        let isSubscribed = true;

        loadHotelDataFromCsv()
            .then((data) => {
                if (isSubscribed) {
                    setHotels(data);
                }
            })
            .catch((e) => {
                console.error(e);
            })
            .finally(() => {
                dispatch({ type: "SetDataLoaded" });
            });

        return () => {
            isSubscribed = false;
        };
    }, []);

    return (
        <>
            <ErrorBoundary>
                <Helmet>
                    <title>
                        {t("general:tagline")} - {t("general:siteName")}
                    </title>
                </Helmet>
                <HotelContext.Provider value={{ hotels }}>
                    <MapContext.Provider value={mapData}>
                        <BrowserRouter>
                            <LegacyHashRouteRedirect>
                                <AnalyticsWrapper>
                                    <Switch>
                                        <Route path="/" exact component={MapPage} />
                                        <Route path="/hotel/:id" exact component={HotelPage} />
                                        <Route path="/person/:name" exact component={PersonPage} />
                                        <Route path="/about" exact component={ContentPage} />
                                        <Route path="/contact" exact component={ContentPage} />
                                        <Route path="/data-export" exact component={ContentPage} />
                                        <Route path="*" component={ErrorPage} />
                                    </Switch>
                                </AnalyticsWrapper>
                            </LegacyHashRouteRedirect>
                        </BrowserRouter>
                    </MapContext.Provider>
                </HotelContext.Provider>
            </ErrorBoundary>
        </>
    );
}

export default App;
