import { BrowserRouter, Route, Routes } from "react-router";
import { Helmet, HelmetProvider } from "react-helmet-async";

import ErrorBoundary from "./components/ErrorBoundary";
import AnalyticsProvider from "./components/analytics/AnalyticsProvider";

import { HotelsProvider } from "./context/hotels-provider";
import { useTranslation } from "react-i18next";

import HotelPage from "./pages/HotelPage";
import HotelsPage from "./pages/HotelsPage";
import ContentPage from "./pages/ContentPage";
import PersonPage from "./pages/PersonPage";
import ErrorPage from "./pages/ErrorPage";
import PressReleasesPage from "./pages/PressReleasesPage";
import { SearchPage } from "./pages/SearchPage";
import { LanguageLayout } from "./pages/LanguageLayout";

function App() {
    const { t } = useTranslation();

    return (
        <HelmetProvider>
            <ErrorBoundary>
                <Helmet>
                    <title>
                        {t("general.tagline")} - {t("general.siteName")}
                    </title>
                </Helmet>
                <HotelsProvider>
                    <BrowserRouter>
                        <AnalyticsProvider>
                            <Routes>
                                <Route path="/:lang?" element={<LanguageLayout />}>
                                    <Route index element={<HotelsPage />} />
                                    <Route path="hotel/:id" element={<HotelPage />} />
                                    <Route path="person/:name" element={<PersonPage />} />
                                    <Route path="about" element={<ContentPage />} />
                                    <Route path="contact" element={<ContentPage />} />
                                    <Route path="data-export" element={<ContentPage />} />
                                    <Route path="press-releases" element={<PressReleasesPage />} />
                                    <Route path="search" element={<SearchPage />} />
                                    <Route path="*" element={<ErrorPage />} />
                                </Route>
                            </Routes>
                        </AnalyticsProvider>
                    </BrowserRouter>
                </HotelsProvider>
            </ErrorBoundary>
        </HelmetProvider>
    );
}

export default App;
