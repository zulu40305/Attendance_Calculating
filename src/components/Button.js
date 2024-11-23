import React from 'react';
import styles from './Button.module.css';

export default function Button(props) {
  return (
    <button 
      className={props.btn === "confirm" ? styles.confirm : styles.cancel} 
      onClick={props.click}
      style={{width: `${props.width}`}}
    >
      {props.content}
    </button>
  );
}