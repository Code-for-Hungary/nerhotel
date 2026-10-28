import { use, createContext, useState, useMemo } from "react";

const BannerContext = createContext({
    isVisible: false,
});

BannerContext.displayName = "BannerContext";

export function useBannerContext() {
    return use(BannerContext);
}

export function BannerProvider({ condition, dismissCallback, checkIfDismissed, children, lang }) {
    const [isDismissed, setIsDismissed] = useState(() => checkIfDismissed());

    const isVisible = useMemo(() => {
        if (lang !== "hu") return false;
        if (!condition()) return false;
        if (isDismissed) return false;

        return true;
    }, [lang, condition, isDismissed]);

    const value = useMemo(
        () => ({
            isVisible,
            onDismiss: () => {
                setIsDismissed(false);
                dismissCallback();
            },
        }),
        [isVisible, setIsDismissed, dismissCallback]
    );

    return <BannerContext value={value}>{children}</BannerContext>;
}
