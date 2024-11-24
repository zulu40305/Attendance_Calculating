import React from 'react';
import styles from './FilterBox.module.css';
import FilterElement from './FilterElement';

export default function FilterBox(props) {
  return (
    <div className={styles.filter_container}>
      {
        props.filters.length >= 1 ?
          props.filters.map(filter => (
            <FilterElement key={filter.id} id={filter.id} filter={filter} delete={props.delete}/>
          ))
        : 
        <h5 className={styles.no_filter_warning}>적용된 필터가 없습니다 | No filters available</h5>
      }
    </div>
  );
}