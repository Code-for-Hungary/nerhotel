import { useEffect } from "react";
import { useLocation } from "react-router";

export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // This resets the window scroll to the top-left corner
        window.scrollTo(0, 0);
    }, [pathname]); // Fires every time the URL path changes

    return null;
}
