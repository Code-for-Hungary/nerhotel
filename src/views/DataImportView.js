import React from 'react';
import Layout from './Layout';
import styles from '../css/data-import.module.css';
import {config} from '../config.js';

const DataExportView = (props) => {
  const {json, setJson} = React.useState(null);
  async function downloadData() {
    return fetch(config.csvUrl);
  }

  return (
    <Layout history={props.history}>
      <div className={styles['data-import']}>
        <section>
          <h1>Adat import</h1>
          <p>Itt lehet letölteni a CSV adatokat, és átalakítani JSON formátumra.</p>
          <button></button>
        </section>
      </div>
    </Layout>
  );
};

export default DataExportView;

