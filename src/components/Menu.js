import React from 'react';
import { Link } from 'react-router-dom';
import closeIcon from '../assets/close-icon.svg';
import styles from '../css/menu.module.css';
import Icon from './Icon';
import image from '../assets/nh-main.svg';
import logo from '../assets/nh-logo.svg';
import { MapContext } from '../context';

const Menu = () => {
  const { dispatch, showMenu } = React.useContext(MapContext);
  const closeMenu = React.useCallback(() => {
    dispatch({ type: 'ToggleMenu', showMenu: false });
  }, [dispatch]);

  if (!showMenu) {
    return null;
  }

  const isDesktop = window.innerWidth > 768;

  return (
    <div className={styles.menu}>
      <div onClick={closeMenu} className={styles.close}>
        <Icon img={closeIcon} size="large"/>
      </div>
      {isDesktop && <div className={styles.logoWrapper}>
        <img src={logo} alt=""/>
      </div>}
      <ul className={styles.menulist}>
        <li><Link to="/">Térkép</Link></li>
        <li><Link to="/about">Mi ez?</Link></li>
        <li><Link to="/contact">Kontakt</Link></li>
        <li><a href="https://tamogatas.k-monitor.hu" target="_blank" rel="noopener noreferrer">Tetszik? Támogasd!</a></li>
        <li><Link to="/data-export">Adat export</Link></li>
      </ul>
      {isDesktop && <div className={styles.imageWrapper}>
        <img src={image} alt=""/>
      </div>}
      <div className={styles.footer}>
        <p><strong>K-Monitor<br/>Közhasznú Egyesület</strong></p>
        <p>Levelezési cím:</p>
        <p>1062 Budapest, Bajza u. 23 I/1</p>
        <a href="mailto:info@k-monitor.hu">info@k-monitor.hu</a>
      </div>
    </div>
  );
};

export default Menu;
