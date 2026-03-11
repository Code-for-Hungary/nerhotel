import { useContext, createContext, useEffect, useState, useMemo } from "react";

const BannerContext = createContext({
    isVisible: false,
});

BannerContext.displayName = "BannerContext";

export function useBannerContext() {
    return useContext(BannerContext);
}

export function BannerProvider({ condition, dismissCallback, checkIfDismissed, children, lang }) {
    const [isVisible, setIsVisible] = useState(false);

    // have to make sure that all of this runs only on the client
    useEffect(() => {
        if (condition() && !checkIfDismissed() && lang === "hu") {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [lang]);

    const value = useMemo(
        () => ({
            isVisible,
            onDismiss: () => {
                setIsVisible(false);
                dismissCallback();
            },
        }),
        [isVisible, setIsVisible, dismissCallback]
    );

    return <BannerContext.Provider value={value}>{children}</BannerContext.Provider>;
}
