import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import ErrorBoundary from "./components/ErrorBoundary";
import AnalyticsProvider from "./components/analytics/AnalyticsProvider";
import { LoadingBar } from "./components/loading-bar";

import { BannerProvider } from "./context/banner-provider";
import { isOnePercentDonationSeason, checkIfAlreadyDismissed, rememberDismiss } from "./components/one-percent-donation-banner";

import { ScrollToTop } from "./components/navigation/ScrollToTop";
import MapPlaceholder from "./components/places/MapPlaceholder";

import PlacePage, { clientLoader as placeLoader } from "./pages/PlacePage";
import PlacesPage, { clientLoader as placesLoader } from "./pages/PlacesPage";
import ContentPage, { clientLoader as contentLoader } from "./pages/ContentPage";
import PersonPage, { clientLoader as personLoader } from "./pages/PersonPage";
import ErrorPage from "./pages/ErrorPage";
import PressReleasesPage from "./pages/PressReleasesPage";
import { SearchPage, clientLoader as searchResultsLoader } from "./pages/SearchPage";
import { LanguageLayout } from "./pages/LanguageLayout";

function RootLayout() {
    const { i18n } = useTranslation();

    return (
        <>
            <ScrollToTop />
            <AnalyticsProvider>
                <BannerProvider
                    condition={isOnePercentDonationSeason}
                    dismissCallback={rememberDismiss}
                    checkIfDismissed={checkIfAlreadyDismissed}
                    lang={i18n.resolvedLanguage}
                >
                    <LoadingBar />
                    <Outlet />
                </BannerProvider>
            </AnalyticsProvider>
        </>
    );
}

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: "/:lang?",
                element: <LanguageLayout />,
                children: [
                    {
                        index: true,
                        element: <PlacesPage />,
                        loader: placesLoader,
                        errorElement: <ErrorPage />,
                        hydrateFallbackElement: <MapPlaceholder />,
                    },
                    { path: "place/:id", element: <PlacePage />, loader: placeLoader, errorElement: <ErrorPage /> },
                    { path: "person/:name", element: <PersonPage />, loader: personLoader, errorElement: <ErrorPage /> },
                    { path: "about", element: <ContentPage />, loader: contentLoader, errorElement: <ErrorPage /> },
                    { path: "contact", element: <ContentPage />, loader: contentLoader, errorElement: <ErrorPage /> },
                    { path: "data-export", element: <ContentPage />, loader: contentLoader, errorElement: <ErrorPage /> },
                    { path: "press-releases", element: <PressReleasesPage /> },
                    { path: "search", element: <SearchPage />, loader: searchResultsLoader, errorElement: <ErrorPage /> },
                    { path: "*", element: <ErrorPage /> },
                ],
            },
        ],
    },
]);

function App() {
    const { t } = useTranslation();

    return (
        <HelmetProvider>
            <ErrorBoundary>
                <Helmet>
                    <title>
                        {t("general.tagline")}
                        {t("general.siteName")}
                    </title>
                </Helmet>
                <RouterProvider router={router} />
            </ErrorBoundary>
        </HelmetProvider>
    );
}

export default App;
