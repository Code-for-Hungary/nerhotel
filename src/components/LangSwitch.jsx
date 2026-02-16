import { useTranslation } from "react-i18next";

import styles from "./LangSwitch.module.css";

function LangSwitch(props) {
    const { t } = useTranslation();

    return (
        <form className={styles.langSwitch}>
            <label>
                <span className="sr-only">{t("i18n.changeLangLabel")}</span>
                <select value={props.currentLocale} onChange={props.onLanguageChange}>
                    {props.availableLocales.map((locale) => (
                        <option key={locale} value={locale}>
                            {locale.toUpperCase()}
                        </option>
                    ))}
                </select>
            </label>
        </form>
    );
}

export default LangSwitch;
