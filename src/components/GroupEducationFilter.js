import styles from './FilterElement.module.css';

export default function GroupEducationFilter() {

  const createColumnRangeOption = () => {
    const options = [];
    for (let i=65; i <= 'Z'.charCodeAt(0); i++) options.push(<option key={i-64} value={String.fromCharCode(i)}>{String.fromCharCode(i)}</option>);
    return options;
  }

  return (
    <>
      <div className={styles.filter}>
        <label className={styles.filter_type_label} htmlFor="filter_value_range">값 범위</label>
        <select className={styles.select} name="filter_value_range">
          <option>=</option>
          <option>&lt;</option>
          <option>&gt;</option>
        </select>
        <label className={styles.filter_type_label} htmlFor="filter_column_range">열 범위</label>
        <select className={styles.select} name="filter_column_range">
          {createColumnRangeOption()}
        </select>
      </div>
      <div className={styles.filter}>
        <label className={styles.filter_type_label} htmlFor="time">수강 시간</label>
        <input className={styles.filter_input} type="text" name="time" placeholder="ex) 00월 00일 0시간"/>
      </div>
    </>
  );
}