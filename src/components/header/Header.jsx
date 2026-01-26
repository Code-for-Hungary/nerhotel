import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

import SearchForm from "./SearchForm";
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
        const newLang = e.target.value;
        // Replaces the first part of the path with the new language
        const pathParts = location.pathname.split("/").filter(Boolean);

        // If first part is a known lang, replace it; otherwise, prepend it
        if (config.locales.available.includes(pathParts[0])) {
            pathParts[0] = newLang;
        } else {
            pathParts.unshift(newLang);
        }

        navigate("/" + pathParts.join("/") + location.search);
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
                <SearchForm />
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
