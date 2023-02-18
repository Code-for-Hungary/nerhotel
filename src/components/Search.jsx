import { useContext, useState, useCallback } from "react";
import styles from "../css/search.module.css";

import { MapContext, HotelContext } from "../context";
import { useTranslation } from "react-i18next";

import findProperty from "../utils/search/find-property";

function Search() {
    const { dispatch } = useContext(MapContext);
    const { t } = useTranslation();
    const { hotels } = useContext(HotelContext);
    const [value, setValue] = useState("");

    const onSearchCallback = useCallback(
        (event) => {
            event.preventDefault();
            dispatch({ type: "TogglePopup", showPopup: false });

            const results = hotels.filter((hotel) => findProperty(hotel.properties, value.toLowerCase()));
            dispatch({ type: "SetList", list: results });
            dispatch({ type: "ToggleList", showList: true });
        },
        [dispatch, hotels, value]
    );

    const onKeyUpCallback = useCallback(
        (event) => {
            setValue(event.target.value);
            if (event.key === "Escape" || value === "") {
                dispatch({ type: "SetList", list: [] });
                dispatch({ type: "ToggleList", showList: false });
            }
        },
        [value, dispatch]
    );

    return (
        <div className={styles.form}>
            <form onSubmit={onSearchCallback}>
                <input onKeyUp={onKeyUpCallback} className={styles.input} placeholder={t("search:placeholder")} type="search" />
            </form>
        </div>
    );
}

export default Search;
