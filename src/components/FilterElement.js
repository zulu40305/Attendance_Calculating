import React from 'react';
import Button from './Button';
import styles from './FilterElement.module.css';

export default function FilterElement(props) {
  return (
    <div className={styles.element_container}>
      <p>This is a filter example with the id: {props.id}</p>
      <Button width="90%" btn="delete" click={() => props.delete(props.id)}>필터 제거</Button>
    </div>
  );
}