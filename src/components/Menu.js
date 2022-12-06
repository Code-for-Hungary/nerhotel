import React from 'react';
import { Link } from 'react-router-dom';
import closeIcon from '../assets/close-icon.svg';
import styles from '../css/menu.module.css';
import Icon from './Icon';
import image from '../assets/nh-main.svg';
import logo from '../assets/nh-logo.svg';
import { MapContext } from '../context';
import PoweredByVercel from './PoweredByVercel';
import { useTranslation } from 'react-i18next';

const Menu = () => {
  const { dispatch, showMenu } = React.useContext(MapContext);
  const { t } = useTranslation();
  const closeMenu = React.useCallback(() => {
    dispatch({ type: 'ToggleMenu', showMenu: false });
  }, [dispatch]);

  if (!showMenu) {
    return null;
  }

  const isDesktop = window.innerWidth > 768;

  return (
    <aside className={styles.menu}>
      <div className={styles.content}>
        <div onClick={closeMenu} className={styles.close}>
          <Icon img={closeIcon} size="large"/>
        </div>
        {isDesktop && <div className={styles.logoWrapper}>
          <img src={logo} alt=""/>
        </div>}
        <ul className={styles.menulist}>
          <li><Link to="/">{t('navigation:map')}</Link></li>
          <li><Link to="/about">{t('navigation:about')}</Link></li>
          <li><Link to="/contact">{t('navigation:contact')}</Link></li>
          <li><a href="https://tamogatas.k-monitor.hu" target="_blank" rel="noopener noreferrer">{t('navigation:supportUs')}</a></li>
          <li><Link to="/data-export">{t('navigation:export')}</Link></li>
        </ul>
        {isDesktop && <div className={styles.imageWrapper}>
          <img src={image} alt=""/>
        </div>}
        <address className={styles.footer}>
          <p>
            <strong dangerouslySetInnerHTML={{__html: t('navigation:address.name')}} />
          </p>
          <p>{t('navigation:address.heading')}:</p>
          <p>{t('navigation:address.address')}</p>
          <a href="mailto:info@k-monitor.hu">info@k-monitor.hu</a>
        </address>
      </div>
      <PoweredByVercel link={'https://vercel.com/'} />
    </aside>
  );
};

export default Menu;
