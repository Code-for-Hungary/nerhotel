import React from 'react'
import styles from '../css/menu.module.css'
import Icon from './Icon';
import closeIcon from '../assets/close-icon.svg';

const Menu = (props) => {
  return (
    <div className={styles.menu}>
      <div onClick={props.close} className={styles.close}>
          <Icon img={closeIcon} size="large" />
      </div>
      <ul className={styles.menulist}>
        <li><a href="">Mi ez?</a></li>
        <li><a href="">Kontakt</a></li>
      </ul>
      <div className={styles.footer}>
          <p><strong>K-Monitor Közhasznú Egyesület</strong></p>
          <p>1077 Budapest, Rózsa u. 8</p>
          <p>1062 Budapest, Bajza u. 23 I/1</p>
          <a href="tel:+3617895005">+36 1 789 5005</a>
          <a href="mailto:info@k-monitor.hu">info@k-monitor.hu</a>
      </div>
    </div>
  )
}

export default Menu
