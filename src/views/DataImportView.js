import React from 'react';
import Layout from './Layout';
import styles from '../css/data-import.module.css';
import { config } from '../config.js';
import { getHotels } from '../utils/getHotels';
import { convertCsvToObject } from '../utils/csvParser.js';

const DataImportView = (props) => {
  const [hotels, setHotels] = React.useState(null);

  async function loadData() {
    const response = await fetch(config.csvUrl, {
      method: 'GET',
    });
    const csvString = await response.text();
    const csvRowsAsObjects = convertCsvToObject(csvString);
    const hotels = getHotels(csvRowsAsObjects);
    setHotels(hotels);
  }

  return (
    <Layout history={props.history}>
      <div className={styles['data-import']}>
        <section>
          <h1>Adat import</h1>
          <p>Itt lehet letölteni a CSV adatokat, és átalakítani JSON formátumra.</p>
          <p>Lépések:</p>
          <ol>
            <li><strong>Letöltés:</strong> Kattints az “Import” gombra és várj pár másodpercet. A frissen letöltött adat megjelenik itt lejjebb.</li>
            <li><strong>Másolás:</strong> Kattints a letöltött adat szövegére bárhol, majd <kbd>Ctrl + A</kbd>-val jelöld ki a szöveget, <kbd>Ctrl + C</kbd>-vel másold ki.</li>
            <li><strong>Beillesztés:</strong> Illeszd be az adatot a <code>nerhotel.json</code>-ba, felülírva annak tartalmát.</li>
            <li><strong>Mentés:</strong> Commitáld és pushold az új adatot. Kész is.</li>
          </ol>
          <button onClick={loadData}>Import</button>
          <textarea value={hotels ? JSON.stringify(hotels, null, 2) : ''} readOnly />
        </section>
      </div>
    </Layout>
  );
};

export default DataImportView;

