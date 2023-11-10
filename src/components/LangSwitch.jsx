import styles from "./LangSwitch.module.css";

function LangSwitch(props) {
    return (
        <form className={styles.langSwitch}>
            <label>
                <span className="sr-only">Nyelvváltás</span>
                <select defaultValue={props.currentLocale} onChange={props.onLanguageChange}>
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
