import styles from './FilterElement.module.css';

export default function OnlineEducationFilter() {

  const createColumnRangeOption = () => {
    const options = [];
    for (let i=65; i <= 'Z'.charCodeAt(0); i++) options.push(<option key={i-64} value={String.fromCharCode(i)}>{String.fromCharCode(i)}</option>);
    return options;
  }

  return (
    <>
      <div className={styles.filter}>
        <label className={styles.filter_type_label} htmlFor="filter_value_range">수강 여부</label>
        <select className={styles.select} name="filter_value_range">
          <option value="1">완료 - 1</option>
          <option value="0">미완료 - 0</option>
        </select>
        <label className={styles.filter_type_label} htmlFor="filter_column_range">열 범위</label>
        <select className={styles.select} name="filter_column_range">
          {createColumnRangeOption()}
        </select>
      </div>
      <div className={styles.filter}>
        <label className={styles.filter_type_label} htmlFor="department_value">수강 시간</label>
        <input className={styles.filter_input} type="text" name="department_value" placeholder="수강 시간을 입력해주세요"/>
      </div>
    </>
  );
}