import React from 'react';
import styles from './TextInput.module.css';

export default function TextInput(props) {

  return (
    <input 
      className={styles.input}
      id={props.id}
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.change}
    />
  );
}