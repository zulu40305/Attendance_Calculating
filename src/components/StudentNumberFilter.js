import styles from './FilterElement.module.css';

export default function StudentNumberFilter() {

  const createColumnRangeOption = () => {
    const options = [];
    for (let i=65; i <= 'Z'.charCodeAt(0); i++) options.push(<option key={i-64} value={String.fromCharCode(i)}>{String.fromCharCode(i)}</option>);
    return options;
  }

  const createStudentNumberOption = () => {
    const options = [];
    for (let i=0; i <= parseInt(new Date().getFullYear().toString().slice(-2)); i++) {
      if (i < 10) options.push(<option key={i} value={`0${i}`}>0{i} 학번</option>);
      else options.push(<option key={i} value={i}>{i} 학번</option>);
    }
    return options;
  }

  return (
    <>
      <div className={styles.filter}>
        <div className={styles.select_block}>
          <label className={styles.filter_type_label} htmlFor="filter_value_range">값 범위</label>
          <select className={styles.select} name="filter_value_range">
            <option value="equal">=</option>
            <option value="little">&lt;</option>
            <option value="great">&gt;</option>
          </select>
        </div>
        <div className={styles.select_block}>
          <label className={styles.filter_type_label} htmlFor="filter_column_range">열 범위</label>
          <select className={styles.select} name="filter_column_range">
            {createColumnRangeOption()}
          </select>
        </div>
      </div>
      <div className={styles.filter}>
        <div className={styles.select_block}>
          <label className={styles.filter_type_label} htmlFor="filter_conjunction">필터 결합</label>
          <select className={styles.select} name="filter_conjunction">
            <option value="and">AND</option>
            <option value="or">OR</option>
          </select>
        </div>
        <div className={styles.select_block}>
          <label className={styles.filter_input_label} htmlFor="student_number_select">학번 값</label>
          <select className={styles.select} name="student_number_select">
            {createStudentNumberOption()}
          </select>
        </div>
      </div>
    </>
  );
}