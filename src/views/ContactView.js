import React, { useEffect } from 'react';
import Header from '../components/Header.js';
import Menu from '../components/Menu';
import styles from '../css/about.module.css';
import store, { closeMenu } from '../store';

const AboutView = (props) => {
  useEffect(() => {
    store.dispatch(closeMenu());
  }, []);


  return (
    <div>
      <Header history={props.history}/>
      <Menu/>
      <div className={styles.about}>
        <section>
          <h1>K-Monitor</h1>
          <p>A K-Monitor Iroda 2007 óta küzd a közpénzek átlátható felhasználásáért és a korrupció visszaszorításáért.
            Civil szervezetünk olyan politikai, gazdasági és társadalmi környezetet megteremtéséért dolgozik, ahol
            az állampolgárok elutasítják, a hatóságok pedig hatékonyan feltárják és szankcionálják a korrupciót.</p>
        </section>
        <section>
          <h2>Elérhetőség</h2>
          <p><strong>K-Monitor Közhasznú Egyesület</strong></p>
          <p>1077 Budapest, Rózsa u. 8</p>
          <p>1062 Budapest, Bajza u. 23 I/1</p>
          <a href="tel:+3617895005">+36 1 789 5005</a>
          <a href="mailto:info@k-monitor.hu">info@k-monitor.hu</a>
        </section>
      </div>
    </div>
  );
}

export default AboutView;
