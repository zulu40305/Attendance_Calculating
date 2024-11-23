import React from 'react';
import styles from './SheetContainer.module.css';

export default function SheetContainer(props) {
  return (
    <div className={styles.excel_container}>
      <div className={styles.label_container}>
        <h2>{props.label}</h2>
      </div>
      <div className={styles.excel}>
        {props.children}
      </div>
    </div>
  );
}