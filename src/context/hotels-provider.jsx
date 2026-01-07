import { useContext, useState, useMemo, createContext, useEffect } from "react";
import loadHotelDataFromCsv from "../utils/load-hotel-data-from-csv";

const hotelsValue = {
    hotels: [],
    isLoading: true,
};

const HotelsContext = createContext(hotelsValue);

HotelsContext.displayName = "HotelsContext";

export function useHotelsContext() {
    return useContext(HotelsContext);
}

export function HotelsProvider({ children }) {
    const [hotels, setHotels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isSubscribed = true;

        loadHotelDataFromCsv()
            .then((data) => {
                if (isSubscribed) {
                    setHotels(data);
                }
            })
            .catch((e) => {
                console.error(e);
            })
            .finally(() => {
                setIsLoading(false);
            });

        return () => {
            isSubscribed = false;
        };
    }, []);

    const value = useMemo(() => ({ hotels, isLoading }), [hotels, isLoading]);

    return <HotelsContext.Provider value={value}>{children}</HotelsContext.Provider>;
}
