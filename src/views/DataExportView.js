import React from 'react';
import Layout from './Layout';
import styles from '../css/data-export.module.css';

const DataExportView = (props) => {
    return (
        <Layout history={props.history}>
            <div className={styles['data-export']}>
                <section>
                    <h1>Adat export</h1>
                    <p>A transzparencia jegyében és az adatok könnyű elemezhetőségéért itt van a NER Hotel teljes adatbázisa CSV formátumban.</p>
                    <p><a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vSEboU5aIOUgZ-hmNpLQIYB8EZTc1HYAFf9mL97jvjVl6S9auEiFxJ1fwMpbr6-7dwPYl57BOK4ANfs/pub?gid=0&single=true&output=csv">Letöltés</a></p>
                </section>
            </div>
        </Layout>
    );
}

export default DataExportView;

