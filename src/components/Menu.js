import React from 'react';
import { Link } from 'react-router-dom';
import closeIcon from '../assets/close-icon.svg';
import styles from '../css/menu.module.css';
import Icon from './Icon';
import image from '../assets/nh-main.svg';
import logo from '../assets/nh-logo.svg';

const Menu = (props) => {
    const isDesktop = window.innerWidth > 768;

    return (
        <div className={styles.menu}>
            <div onClick={props.close} className={styles.close}>
                <Icon img={closeIcon} size="large"/>
            </div>
            {isDesktop && <div className={styles.logoWrapper}>
                <img src={logo}/>
            </div>}
            <ul className={styles.menulist}>
                <li><Link to="/">Térkép</Link></li>
                <li><Link to="/about">Mi ez?</Link></li>
                <li><Link to="/contact">Kontakt</Link></li>
                <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSdi6uNP-ML46outzCbOifdwKefAaB1x_j9eXMzeTJYGB5NEnA/viewform" target="_blank">Küldj be!</a></li>
                <li><a href="tamogatas.k-monitor.hu" target="_blank">Támogatás</a></li>
            </ul>
            {isDesktop && <div className={styles.imageWrapper}>
              <img src={image} />
            </div>}
            <div className={styles.footer}>
                <p><strong>K-Monitor<br/>Közhasznú Egyesület</strong></p>
                <p>1077 Budapest, Rózsa u. 8</p>
                <p>1062 Budapest, Bajza u. 23 I/1</p>
                <a href="tel:+3617895005">+36 1 789 5005</a>
                <a href="mailto:info@k-monitor.hu">info@k-monitor.hu</a>
            </div>
        </div>
    );
};

export default Menu;
