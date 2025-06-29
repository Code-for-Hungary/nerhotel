import { useEffect, useState, useReducer } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { Helmet } from "react-helmet";

import ErrorBoundary from "./components/ErrorBoundary";
import AnalyticsWrapper from "./components/analytics/AnalyticsWrapper";

import { MapContext, HotelContext } from "./context";
import reducer, { initialState } from "./reducer";
import { useTranslation } from "react-i18next";
import { config } from "./config";

import loadHotelDataFromCsv from "./utils/load-hotel-data-from-csv";
import LegacyHashRouteRedirect from "./components/routing/LegacyHashRouteRedirect";

import HotelView from "./views/HotelView";
import MapView from "./views/MapView";
import ContentPageView from "./views/ContentPageView";
import PersonView from "./views/PersonView";
import ErrorView from "./views/ErrorView";
import PressReleasesView from "./views/PressReleasesView";

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
                        {t("general.tagline")} - {t("general.siteName")}
                    </title>
                </Helmet>
                <HotelContext.Provider value={{ hotels }}>
                    <MapContext.Provider value={mapData}>
                        <BrowserRouter>
                            <LegacyHashRouteRedirect>
                                <AnalyticsWrapper>
                                    <Routes>
                                        <Route path="/" element={<MapView />} />
                                        <Route path="/hotel/:id" element={<HotelView />} />
                                        <Route path="/person/:name" element={<PersonView />} />
                                        <Route path="/about" element={<ContentPageView />} />
                                        <Route path="/contact" element={<ContentPageView />} />
                                        <Route path="/data-export" element={<ContentPageView />} />
                                        <Route path="/press-releases" element={<PressReleasesView />} />
                                        <Route path="*" element={<ErrorView />} />
                                    </Routes>
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
