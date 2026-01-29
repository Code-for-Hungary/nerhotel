import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

import styles from "./SearchForm.module.css";

import { useTranslation } from "react-i18next";
import Icon from "../ui/Icon";
import searchIcon from "../../assets/search.svg";

function SearchForm() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [value, setValue] = useState(searchParams.get("q") ?? "");

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
