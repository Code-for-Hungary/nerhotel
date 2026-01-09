import { useEffect, useReducer } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { Helmet, HelmetProvider } from "react-helmet-async";

import ErrorBoundary from "./components/ErrorBoundary";
import AnalyticsWrapper from "./components/analytics/AnalyticsWrapper";

import { MapContext } from "./context";
import { HotelsProvider } from "./context/hotels-provider";
import reducer, { initialState } from "./reducer";
import { useTranslation } from "react-i18next";
import { config } from "./config";

import LegacyHashRouteRedirect from "./components/routing/LegacyHashRouteRedirect";

import HotelPage from "./pages/HotelPage";
import HotelsPage from "./pages/HotelsPage";
import ContentPage from "./pages/ContentPage";
import PersonPage from "./pages/PersonPage";
import ErrorPage from "./pages/ErrorPage";
import PressReleasesPage from "./pages/PressReleasesPage";

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const mapData = { ...state, dispatch };
    const { i18n, t } = useTranslation();

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

    return (
        <HelmetProvider>
            <ErrorBoundary>
                <Helmet>
                    <title>
                        {t("general.tagline")} - {t("general.siteName")}
                    </title>
                </Helmet>
                <HotelsProvider>
                    <MapContext.Provider value={mapData}>
                        <BrowserRouter>
                            <LegacyHashRouteRedirect>
                                <AnalyticsWrapper>
                                    <Routes>
                                        <Route path="/" element={<HotelsPage />} />
                                        <Route path="/hotel/:id" element={<HotelPage />} />
                                        <Route path="/person/:name" element={<PersonPage />} />
                                        <Route path="/about" element={<ContentPage />} />
                                        <Route path="/contact" element={<ContentPage />} />
                                        <Route path="/data-export" element={<ContentPage />} />
                                        <Route path="/press-releases" element={<PressReleasesPage />} />
                                        <Route path="*" element={<ErrorPage />} />
                                    </Routes>
                                </AnalyticsWrapper>
                            </LegacyHashRouteRedirect>
                        </BrowserRouter>
                    </MapContext.Provider>
                </HotelsProvider>
            </ErrorBoundary>
        </HelmetProvider>
    );
}

export default App;
