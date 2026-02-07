import { useContext, useState, useMemo, createContext, useEffect } from "react";
import loadPlaceDataFromCsv from "../utils/load-place-data-from-csv";

const placesValue = {
    places: [],
    isLoading: true,
};

const PlacesContext = createContext(placesValue);

PlacesContext.displayName = "PlacesContext";

export function usePlacesContext() {
    return useContext(PlacesContext);
}

export function PlacesProvider({ children }) {
    const [places, setPlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isSubscribed = true;

        loadPlaceDataFromCsv()
            .then((data) => {
                if (isSubscribed) {
                    setPlaces(data);
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

    const value = useMemo(() => ({ places, isLoading }), [places, isLoading]);

    return <PlacesContext.Provider value={value}>{children}</PlacesContext.Provider>;
}
