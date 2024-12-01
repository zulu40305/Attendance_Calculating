import React from 'react';
import styles from './FilterElement.module.css';
import StudentNumberFilter from './StudentNumberFilter';
import DepartmentFilter from './DepartmentFIlter';
import OnlineEducationFilter from './OnlineEducationFilter';
import GroupEducationFilter from './GroupEducationFilter';
import EducationCompleteFilter from './EducationCompleteFilter';

export default function FilterElement(props) {

  const renderFilterTitle = (filterType) => {
    switch (filterType) {
      case "student_number":
        return <span className={styles.filter_type_label}>필터 타입 - 학번</span>;
      case "department":
        return <span className={styles.filter_type_label}>필터 타입 - 학부</span>;
      case "online_education":
        return <span className={styles.filter_type_label}>필터 타입 - 온라인 교육</span>;
      case "group_education":
        return <span className={styles.filter_type_label}>필터 타입 - 집체교육</span>;
      case "education_complete":
        return <span className={styles.filter_type_label}>필터 타입 - 안전교육완료</span>;
      default:
        return null;
    }
  };

  const renderFilterContent = (filterType) => {
    switch (filterType) {
      case "student_number":
        return <StudentNumberFilter filter={props.filter} handleFilterOption={props.handleStudentNumber} />;
      case "department":
        return <DepartmentFilter filter={props.filter} handleFilterOption={props.handleDepartment} />;
      case "online_education":
        return <OnlineEducationFilter filter={props.filter} handleFilterOption={props.handleOnlineEducation} />;
      case "group_education":
        return <GroupEducationFilter filter={props.filter} handleFilterOption={props.handleGroupEducation} />;
      case "education_complete":
        return <EducationCompleteFilter filter={props.filter} handleFilterOption={props.handleEducationComplete} />;
      default:
        return null;
    }
  };
  
  return (
    <div className={styles.element_container}>
      <div className={styles.filter_type_block}>
        {renderFilterTitle(props.filter.type)}
      </div>
      {
        <div className={styles.filter_block}>
          {renderFilterContent(props.filter.type)}
        </div>
      }
    </div>
  );
}