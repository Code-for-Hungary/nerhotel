import React from 'react';
import styles from '../css/icon.module.css';

export default function (props) {
  return (
    <div className={[styles.iconWrapper, styles[props.size]].join(' ')}>
      <img src={props.img}/>
    </div>
  );
}
