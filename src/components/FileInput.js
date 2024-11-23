import React from 'react';
import styles from './FileInput.module.css';

export default function FileInput(props) {
  return (
    <input className={styles.input} type="file" name={props.name} id={props.id} accept={props.accept}/>
  );
}