import React from 'react';
import styles from './Button.module.css';

export default function Button(props) {
  return (
    <button 
      className={props.btn === "confirm" ? styles.confirm : props.btn === "cancel" ? styles.cancel : styles.delete} 
      onClick={props.click}
      style={{width: `${props.width}`}}
    >
      {props.children}
    </button>
  );
}