import React from 'react';
import Layout from './Layout';
import styles from '../css/about.module.css';

// TODO: This is called "AboutView" but it's in a file called "ContactView". Also the CSS is reused.
//       Suggestion: rename constant to "ContactView", and rename the CSS to something more generic,
//                   and keep on using it here. Also, in DataExportView, the same CSS should be used
//                   as it's now a duplicate.
const AboutView = (props) => {
  return (
    <Layout history={props.history}>
      <div className={styles.about}>
        <section>
          <h1>K-Monitor</h1>
          <p>A K-Monitor Iroda 2007 óta küzd a közpénzek átlátható felhasználásáért és a korrupció visszaszorításáért.
            Civil szervezetünk olyan politikai, gazdasági és társadalmi környezetet megteremtéséért dolgozik, ahol
            az állampolgárok elutasítják, a hatóságok pedig hatékonyan feltárják és szankcionálják a korrupciót.</p>
            <p><a href="https://tamogatas.k-monitor.hu/" target="new">Támogasd munkánkat rendszeres adományoddal!</a></p>
        </section>
        <section>
          <h2>Elérhetőség</h2>
          <p><strong>K-Monitor Közhasznú Egyesület</strong></p>
          <p>Levelezési cím: 1062 Budapest, Bajza u. 23.</p>
          <a href="mailto:info@k-monitor.hu">info@k-monitor.hu</a>&nbsp;
          <a href="https://k-monitor.hu" target="new">k-monitor.hu</a>

        </section>
      </div>
    </Layout>
  );
}

export default AboutView;
