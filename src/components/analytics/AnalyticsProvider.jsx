import { useEffect, useContext, useReducer, createContext } from "react";
import { useLocation } from "react-router";

import trackPageView from "../../utils/analytics/track-page-view";

import { analyticsReducer } from "./analytics-reducer";

const AnalyticsContext = createContext();

AnalyticsContext.displayName = "AnalyticsContext";

export function useAnalyticsContext() {
    const ctx = useContext(AnalyticsContext);

    if (!ctx) {
        throw new Error("useAnalyticsContext must be used within a AnalyticsContext.Provider");
    }

    return ctx;
}

function AnalyticsProvider({ children }) {
    const location = useLocation();
    const [state, dispatch] = useReducer(analyticsReducer);

    useEffect(() => {
        if (state && window.dataLayer) {
            window.dataLayer.push(state);
        }
    }, [state]);

    useEffect(() => {
        trackPageView();
    }, [location]);

    return <AnalyticsContext.Provider value={{ dispatchAnalyticsEvent: dispatch }}>{children}</AnalyticsContext.Provider>;
}

export default AnalyticsProvider;
