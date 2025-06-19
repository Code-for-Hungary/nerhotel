import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function LegacyHashRouteRedirect({ children }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.hash && location.hash.includes("/")) {
            const hashAsArray = location.hash.split("");
            hashAsArray.shift();
            const withoutHashMark = hashAsArray.join("");
            navigate(withoutHashMark, { replace: true });
        }
    }, [location]);

    return <>{children}</>;
}

export default LegacyHashRouteRedirect;
