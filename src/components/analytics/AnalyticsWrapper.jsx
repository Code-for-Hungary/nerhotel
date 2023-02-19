import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { MapContext } from "../../context";
import trackPageView from "../../utils/analytics/track-page-view";

function AnalyticsWrapper({ children }) {
    const history = useHistory();
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
        history.listen(trackPageView);
    }, [history]);

    return <>{children}</>;
}

export default AnalyticsWrapper;
