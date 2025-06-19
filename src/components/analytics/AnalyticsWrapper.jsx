import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { MapContext } from "../../context";
import trackPageView from "../../utils/analytics/track-page-view";

function AnalyticsWrapper({ children }) {
    const location = useLocation();
    const { selectedPoint } = useContext(MapContext);

    useEffect(() => {
        if (selectedPoint && window.dataLayer) {
            window.dataLayer.push({
                event: "event",
                eventProps: {
                    action: "open popup",
                    category: "map",
                    label: `${selectedPoint.properties.name} (id: ${selectedPoint.properties.id})`,
                },
            });
        }
    }, [selectedPoint]);

    useEffect(() => {
        trackPageView();
    }, [location]);

    return <>{children}</>;
}

export default AnalyticsWrapper;
