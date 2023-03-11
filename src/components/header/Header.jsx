import { useContext, useCallback } from "react";

import Search from "./Search";
import styles from "./Header.module.css";
import Icon from "../ui/Icon";
import listIcon from "../../assets/menu-icon.svg";

import logo from "../../assets/nh-logo.svg";
import logoEn from "../../assets/nh-logo-en.svg";
import hotel from "../../assets/nh-hotel.svg";
import beach from "../../assets/nh-beach.svg";
import restaurant from "../../assets/nh-restaurant.svg";
import golf from "../../assets/nh-golf.svg";
import { MapContext } from "../../context";

import { config } from "../../config";
import LangSwitch from "../LangSwitch";

import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { SmartLink } from "../SmartLink";

const Header = (props) => {
    const { dispatch } = useContext(MapContext);
    const { i18n } = useTranslation();
    const { resolvedLanguage } = i18n;
    const location = useLocation();

    const languageChangeHandler = (e) => {
        const lang = e.target.value;
        i18n.changeLanguage(lang);
        localStorage.setItem(config.locales.paramName, lang);
        props.history.push({
            pathname: location.pathname,
            search: `?${config.locales.paramName}=${lang}`,
        });
    };

    const onMenuCallback = useCallback(() => {
        dispatch({ type: "ToggleMenu", showMenu: true });
    }, [dispatch]);

    const headerHeight = props.withSearch ? styles.large : styles.small;

    return (
        <header className={[styles.header, headerHeight].join(" ")}>
            <div className={styles.menubutton} onClick={onMenuCallback}>
                <Icon img={listIcon} size="large" />
            </div>
            <div className={styles.headerWrapper}>
                <SmartLink
                    to="/"
                    onClick={() => {
                        dispatch({ type: "TogglePopup", showPopup: false });
                    }}
                    className={styles.logo}
                >
                    <img
                        src={resolvedLanguage === "hu" ? logo : logoEn}
                        alt=""
                        width="47"
                        height="112"
                        style={{ aspectRatio: "47 / 112" }}
                    />
                </SmartLink>
                <div className={styles.headerInner}>
                    <div className={styles.icons}>
                        <img src={hotel} alt="" width="40" height="40" />
                        <img src={beach} alt="" width="40" height="40" />
                        <img src={restaurant} alt="" width="40" height="40" />
                        <img src={golf} alt="" width="40" height="40" />
                    </div>
                    {props.withSearch && <Search />}
                </div>
            </div>
            <div className={styles.langSwitchContainer}>
                <LangSwitch
                    availableLocales={config.locales.available}
                    onLanguageChange={languageChangeHandler}
                    currentLocale={i18n.resolvedLanguage}
                />
            </div>
        </header>
    );
};

export default Header;
