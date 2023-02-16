import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import trackPageView from "../utils/track-page-view";

function AnalyticsWrapper({ children }) {
  const history = useHistory();
  useEffect(() => {
    trackPageView();
    history.listen(trackPageView);
  }, [history]);

  return <>{children}</>;
}

export default AnalyticsWrapper;
