import React from 'react';
import styles from '../css/lang-switch.module.css';

function LangSwitch(props) {
    return (
        <form className={styles.langSwitch}>
            {props.availableLocales.map((locale) => {
                const isCurrent = props.currentLocale === locale;
                return (
                    <label
                        className={`${styles.langSwitchButton} ${isCurrent ? styles.active : ''}`}
                        key={locale}
                    >
                        <span className="sr-only">
                            <input
                                type="radio"
                                name="selected-locale"
                                value={locale}
                                disabled={isCurrent}
                                onChange={props.onLanguageChange}
                            />
                        </span>
                        {locale}
                    </label>
                )
            })}
        </form>
    );
}

export default LangSwitch;