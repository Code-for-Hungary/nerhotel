import { useEffect, useContext } from "react";
import { MapContext } from "../context";
import { useHistory } from "react-router-dom";
import trackPageView from "../utils/track-page-view";
import ReactGa from "react-ga";

function AnalyticsWrapper({ children }) {
  const history = useHistory();
  const { selectedPoint } = useContext(MapContext);

  useEffect(() => {
    if (selectedPoint) {
      ReactGa.event({
        action: "open popup",
        category: "map",
        label: `${selectedPoint.properties.name} (id: ${selectedPoint.properties.id})`,
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
