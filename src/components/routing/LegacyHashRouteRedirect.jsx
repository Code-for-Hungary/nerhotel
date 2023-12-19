import { useEffect } from "react";
import { useHistory } from "react-router-dom";

function LegacyHashRouteRedirect({ children }) {
    const history = useHistory();

    useEffect(() => {
        if (window.location.hash && window.location.hash.includes("/")) {
            const hashAsArray = window.location.hash.split("");
            hashAsArray.shift();
            const withoutHashMark = hashAsArray.join("");
            history.push(withoutHashMark);
        }
    }, [history]);

    return <>{children}</>;
}

export default LegacyHashRouteRedirect;
