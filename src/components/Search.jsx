import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useHotelsContext } from "../context/hotels-provider";

import findProperty from "../utils/search/find-property";

import styles from "../css/map.module.css";
import List from "./List";
import LoadingSpinner from "./ui/LoadingSpinner";

export const Search = ({ query }) => {
    const [results, setResults] = useState([]);
    const { hotels, isLoading } = useHotelsContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && hotels.length && query && query.length) {
            const found = hotels.filter((hotel) => findProperty(hotel.properties, query.toLowerCase()));
            setResults(found);
        }
    }, [hotels, isLoading, query]);

    return (
        <div className={styles.map}>
            <div className={styles.mapWrapper}>
                {isLoading && (
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate3d(-50%, -50%, 0)",
                        }}
                    >
                        <LoadingSpinner size="64px" color="var(--nh-blue)" />
                    </div>
                )}

                {!isLoading && results && <List list={results} onClose={() => navigate(-1)} />}
            </div>
        </div>
    );
};
