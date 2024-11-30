import React, { useState } from 'react';
import { RiCloseFill } from "react-icons/ri";
import styles from './FilterElement.module.css';
import StudentNumberFilter from './StudentNumberFilter';
import DepartmentFilter from './DepartmentFIlter';
import OnlineEducationFilter from './OnlineEducationFilter';
import GroupEducationFilter from './GroupEducationFilter';
import EducationCompleteFilter from './EducationCompleteFilter';

export default function FilterElement(props) {
  const [filterType, setFilterType] = useState("none");

  const changeFilterType = (e) => {
    setFilterType(e.target.value);
    props.handleFilterType(props.id, e.target.value);
  };

  const renderFilterContent = () => {
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
      <button className={styles.delete} onClick={() => props.delete(props.id)}><RiCloseFill /></button>
      <div className={styles.filter_type_block}>
        <label className={styles.filter_type_label} htmlFor="filter_type">필터 타입</label>
        <select className={styles.select} name="filter_type" onChange={changeFilterType}>
          <option value="none">필터 타입 선택</option>
          <option value="student_number">학번</option>
          <option value="department">학부</option>
          <option value="online_education">온라인 교육</option>
          <option value="group_education">집체교육</option>
          <option value="education_complete">안전교육 완료 여부</option>
        </select>
      </div>
      {
        filterType !== "none" ?
          <div className={styles.filter_block}>
            {renderFilterContent()}
          </div>
        :
          <></>
      }
    </div>
  );
}