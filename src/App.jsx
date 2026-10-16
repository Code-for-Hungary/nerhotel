import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import ErrorBoundary from "./components/ErrorBoundary";
import AnalyticsProvider from "./components/analytics/AnalyticsProvider";

import { BannerProvider } from "./context/banner-provider";
import { isOnePercentDonationSeason, checkIfAlreadyDismissed, rememberDismiss } from "./components/one-percent-donation-banner";

import { ScrollToTop } from "./components/navigation/ScrollToTop";
import MapPlaceholder from "./components/places/MapPlaceholder";

import PlacePage, { clientLoader as placeLoader } from "./pages/PlacePage";
import PlacesPage, { clientLoader as placesLoader } from "./pages/PlacesPage";
import ContentPage from "./pages/ContentPage";
import PersonPage, { clientLoader as personLoader } from "./pages/PersonPage";
import ErrorPage from "./pages/ErrorPage";
import PressReleasesPage from "./pages/PressReleasesPage";
import { SearchPage, clientLoader as searchResultsLoader } from "./pages/SearchPage";
import { LanguageLayout } from "./pages/LanguageLayout";

// Root layout that wraps application-wide providers INSIDE the router context
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
                    <Outlet />
                </BannerProvider>
            </AnalyticsProvider>
        </>
    );
}

// Define the router configuration object
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
                    { path: "place/:id", element: <PlacePage />, loader: placeLoader },
                    { path: "person/:name", element: <PersonPage />, loader: personLoader },
                    { path: "about", element: <ContentPage /> },
                    { path: "contact", element: <ContentPage /> },
                    { path: "data-export", element: <ContentPage /> },
                    { path: "press-releases", element: <PressReleasesPage /> },
                    { path: "search", element: <SearchPage />, loader: searchResultsLoader },
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
