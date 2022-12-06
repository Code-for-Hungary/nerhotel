import React from 'react';

import Search from './Search';
import styles from '../css/header.module.css';
import Icon from './Icon';
import listIcon from '../assets/menu-icon.svg';

import logo from '../assets/nh-logo.svg';
import hotel from '../assets/nh-hotel.svg';
import beach from '../assets/nh-beach.svg';
import restaurant from '../assets/nh-restaurant.svg';
import golf from '../assets/nh-golf.svg';
import { MapContext } from '../context';

import { config } from '../config';
import LangSwitch from './LangSwitch';

import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const Header = (props) => {
  const { dispatch } = React.useContext(MapContext);
  const { i18n } = useTranslation();
  const location = useLocation();

  const goHome = () => {
    dispatch({ type: 'TogglePopup', showPopup: false });
    props.history.push('/');
  };

  const languageChangeHandler = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem(config.locales.paramName, lang);
    props.history.push({
      pathname: location.pathname,
      search: `?${config.locales.paramName}=${lang}`,
    });
  }

  const onMenuCallback = React.useCallback(() => {
    dispatch({ type: 'ToggleMenu', showMenu: true })
  }, [dispatch]);

  const headerHeight = props.withSearch ? styles.large : styles.small;

  return (
    <header className={[styles.header, headerHeight].join(' ')}>
      <div className={styles.menubutton} onClick={onMenuCallback}>
        <Icon img={listIcon} size="large"/>
      </div>
      <div className={styles.headerWrapper}>
        <div onClick={() => goHome()} className={styles.logo}>
          <img src={logo} alt=""/>
        </div>
        <div className={styles.headerInner}>
          <div className={styles.icons}>
            <img src={hotel} alt=""/>
            <img src={beach} alt=""/>
            <img src={restaurant} alt=""/>
            <img src={golf} alt=""/>
          </div>
          {props.withSearch && <Search/>}
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
}

export default Header;
