import React from 'react';
import Layout from './Layout';
import styles from '../css/data-import.module.css';
import {config} from '../config.js';
import {convertCsvToObject} from '../utils/csvParser.js';

const DataImportView = (props) => {
  const [hotels, setHotels] = React.useState(null);

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

  async function loadData() {
    const response = await fetch(config.csvUrl, {
      method: 'GET',
    });
    const csvString = await response.text();
    const csvRowsAsObjects = convertCsvToObject(csvString);
    const hotels = convertToHotels(csvRowsAsObjects);
    setHotels(hotels);
  }

  /**
   * @param {Object<string, string>[]} csvRowsAsObjects
   * @returns {Hotel[]}
   */
  function convertToHotels(csvRowsAsObjects) {
    return csvRowsAsObjects.map((csvRow, index) => {
      /** @type {{name: string, link: string}[]} */
      const oligarchs = [
        {name: csvRow['T1 OL'], link: csvRow['T1_link']},
        {name: csvRow['T2 OL'], link: csvRow['T2_link']},
        {name: csvRow['T3 OL'], link: csvRow['T3_link']},
      ];
      /** @type {{name: string, link: string}[]} */
      const ceos = [
        {name: csvRow['IT1'], link: csvRow['IT1_link']},
        {name: csvRow['IT2'], link: csvRow['IT2_link']},
        {name: csvRow['IT3'], link: csvRow['IT3_link']},
      ];
      return {
        type: 'Feature',
        properties: {
          id: index,
          address: [csvRow['city'], csvRow['loc_address'], csvRow['zip']].join(', '),
          company: {'name': csvRow['company'].trim(), 'link': csvRow['company_link']},
          name: csvRow['loc_name'],
          city: csvRow['city'],
          type: csvRow['type'],
          link: csvRow['news'],
          mainOligarch: getMainOligarchs(oligarchs),
          mainCEO: getMainOligarchs(ceos),
          oligarchs: cleanOligarchs(oligarchs),
          ceos: cleanOligarchs(ceos),
          date: csvRow['date'],
          details: csvRow['details'],
        },
        geometry: {
          type: 'Point',
          coordinates: [parseFloat(csvRow['lat']), parseFloat(csvRow['lng'])],
        },
      };
    });
  }

  /**
   * @param {{name: string, link: string}[]} people
   * @returns {{name: string, link: string}[]} Only the ones whose name starts with "!!!"
   */
  function getMainOligarchs(people) {
    return people.filter(person => person.name.startsWith('!!!'))
      .map(person => ({name: person.name.substring(3).trim(), link: person.link}));
  }

  /**
   * @param {{name: string, link: string}[]} people
   * @returns {{name: string, link: string}[]} Without empty ones, and with "!!!"-s removed
   */
  function cleanOligarchs(people) {
    return people.filter(person => person.name)
      .map(person => ({name: person.name.substring(3).trim(), link: person.link}));
  }
};

export default DataImportView;

