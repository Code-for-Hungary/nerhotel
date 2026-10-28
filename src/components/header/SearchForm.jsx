import { Form, useSearchParams, useParams } from "react-router";

import styles from "./SearchForm.module.css";

import { useTranslation } from "react-i18next";
import Icon from "../ui/Icon";
import searchIcon from "../../assets/search.svg";
import { config } from "../../config";

function SearchForm() {
    const { t, i18n } = useTranslation();
    const [searchParams] = useSearchParams();
    const { lang } = useParams();
    const initialQuery = searchParams.get("q") ?? "";

    const currentLang = lang || i18n.resolvedLanguage || config.locales.default;

    const onSubmitHandler = (e) => {
        const normalizedValue = e.currentTarget.value?.trim();

        if (normalizedValue?.length === 0) {
            e.preventDefault();
        }
    };

    return (
        <div className={styles.form}>
            <Form method="get" action={`/${currentLang}/search`} onSubmit={onSubmitHandler}>
                <input defaultValue={initialQuery} name="q" className={styles.input} placeholder={t("search.placeholder")} type="search" />
                <button type="submit" className={[styles.searchButton, "resetButton"].join(" ")}>
                    <Icon img={searchIcon} size="large" />
                </button>
            </Form>
        </div>
    );
}

export default SearchForm;
