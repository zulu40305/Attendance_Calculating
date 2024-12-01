import React from 'react';
import styles from './FilterBox.module.css';
import FilterElement from './FilterElement';

export default function FilterBox(props) {

  return (
    <div className={styles.filter_container}>
      {
        props.filters.map(filter => (
          <FilterElement 
            key={filter.id} 
            id={filter.id} 
            filter={filter} 
            handleFilterType={props.handleFilterType}
            handleStudentNumber={props.handleStudentNumber}
            handleDepartment={props.handleDepartment}
            handleOnlineEducation={props.handleOnlineEducation}
            handleGroupEducation={props.handleGroupEducation}
            handleEducationComplete={props.handleEducationComplete}
          />
        ))
      }
    </div>
  );
}