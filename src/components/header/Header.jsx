import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

import Search from "./Search";
import styles from "./Header.module.css";
import Icon from "../ui/Icon";
import listIcon from "../../assets/menu-icon.svg";

import logo from "../../assets/nh-logo.svg";
import logoEn from "../../assets/nh-logo-en.svg";

import { config } from "../../config";
import LangSwitch from "../LangSwitch";

import { SmartLink } from "../SmartLink";

const Header = ({ onMenuOpen }) => {
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const { resolvedLanguage } = i18n;
    const location = useLocation();

    const languageChangeHandler = (e) => {
        const lang = e.target.value;
        i18n.changeLanguage(lang);
        localStorage.setItem(config.locales.paramName, lang);
        navigate({
            pathname: location.pathname,
            search: `?${config.locales.paramName}=${lang}`,
        });
    };

    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <SmartLink to="/" className={styles.logo}>
                    <img
                        src={resolvedLanguage === "hu" ? logo : logoEn}
                        alt=""
                        width="27"
                        height="64"
                        style={{ aspectRatio: "27 / 64" }}
                        className={styles.logo}
                    />
                </SmartLink>
            </div>
            <div className={styles.searchContainer}>
                <Search />
            </div>
            <div className={styles.langSwitchContainer}>
                <LangSwitch
                    availableLocales={config.locales.available}
                    onLanguageChange={languageChangeHandler}
                    currentLocale={i18n.resolvedLanguage}
                />
            </div>
            <div className={styles.menuContainer}>
                <button onClick={onMenuOpen} type="button" className="resetButton">
                    <Icon img={listIcon} size="large" />
                </button>
            </div>
        </header>
    );
};

export default Header;
