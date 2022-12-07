import React from 'react';
import styles from '../css/powered-by-vercel.module.css';

function PoweredByVercel(props) {
    return (
        <a
            href={props.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.poweredByVercel}
        >
            Powered by ▲ Vercel
        </a>
    );
}

export default PoweredByVercel;