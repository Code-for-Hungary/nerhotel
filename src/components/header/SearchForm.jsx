import { useState } from "react";
import { useNavigate } from "react-router";

import styles from "./SearchForm.module.css";

// import { useHotelsContext } from "../../context/hotels-provider";
import { useTranslation } from "react-i18next";
import Icon from "../ui/Icon";
import searchIcon from "../../assets/search.svg";

// import findProperty from "../../utils/search/find-property";

function SearchForm() {
    // const { dispatch } = useContext(MapContext);
    const { t } = useTranslation();
    const navigate = useNavigate();
    // const { hotels } = useHotelsContext();
    const [value, setValue] = useState("");

    // const onSearchCallback = useCallback(
    //     (event) => {
    //         event.preventDefault();

    //         const results = hotels.filter((hotel) => findProperty(hotel.properties, value.toLowerCase()));
    //         // dispatch({ type: "SetList", list: results });
    //         // dispatch({ type: "ToggleList", showList: true });
    //     },
    //     [dispatch, hotels, value]
    // );

    // const onKeyUpCallback = useCallback(
    //     (event) => {
    //         setValue(event.target.value);
    //         if (event.key === "Escape" || value === "") {
    //             // dispatch({ type: "SetList", list: [] });
    //             // dispatch({ type: "ToggleList", showList: false });
    //         }
    //     },
    //     [value, dispatch]
    // );

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const normalizedValue = value.trim();

        if (normalizedValue.length === 0) {
            return;
        }

        navigate({
            pathname: "/search",
            search: `?q=${encodeURIComponent(normalizedValue)}`,
        });
    };

    return (
        <div className={styles.form}>
            <form onSubmit={onSubmitHandler}>
                <input
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    className={styles.input}
                    placeholder={t("search.placeholder")}
                    type="search"
                />
                <button type="submit" className={[styles.searchButton, "resetButton"].join(" ")}>
                    <Icon img={searchIcon} size="large" />
                </button>
            </form>
        </div>
    );
}

export default SearchForm;
