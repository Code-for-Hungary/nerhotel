import { useEffect, use, useReducer, createContext } from "react";
import { useLocation } from "react-router";

import trackPageView from "../../utils/analytics/track-page-view";

import { analyticsReducer } from "./analytics-reducer";

const AnalyticsContext = createContext();

AnalyticsContext.displayName = "AnalyticsContext";

export function useAnalyticsContext() {
    const ctx = use(AnalyticsContext);

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

    return <AnalyticsContext value={{ dispatchAnalyticsEvent: dispatch }}>{children}</AnalyticsContext>;
}

export default AnalyticsProvider;
