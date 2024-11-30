import styles from './FilterElement.module.css';

export default function StudentNumberFilter(props) {

  const createColumnRangeOption = () => {
    const options = [];
    for (let i=65; i <= 'Z'.charCodeAt(0); i++) options.push(<option key={i-65} value={i-65}>{String.fromCharCode(i)}</option>);
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
          <select className={styles.select} name="filter_value_range" onChange={
            (e) => props.handleFilterOption({
              id: props.filter.id,
              type: props.filter.type,
              value_range: e.target.value,
              column: props.filter.column,
              conjunction: props.filter.conjunction,
              student_number: props.filter.student_number
            })
          }>
            <option value="==">=</option>
            <option value="<">&lt;</option>
            <option value=">">&gt;</option>
          </select>
        </div>
        <div className={styles.select_block}>
          <label className={styles.filter_type_label} htmlFor="filter_column_range">열 범위</label>
          <select className={styles.select} name="filter_column_range" onChange={
            (e) => props.handleFilterOption({
              id: props.filter.id,
              type: props.filter.type,
              value_range: props.filter.value_range,
              column: e.target.value,
              conjunction: props.filter.conjunction,
              student_number: props.filter.student_number
            })
          }>
            {createColumnRangeOption()}
          </select>
        </div>
      </div>
      <div className={styles.filter}>
        <div className={styles.select_block}>
          <label className={styles.filter_type_label} htmlFor="filter_conjunction">필터 결합</label>
          <select className={styles.select} name="filter_conjunction" onChange={
            (e) => props.handleFilterOption({
              id: props.filter.id,
              type: props.filter.type,
              value_range: props.filter.value_range,
              column: props.filter.column,
              conjunction: e.target.value,
              student_number: props.filter.student_number
            })
          }>
            <option value="&&">AND</option>
            <option value="||">OR</option>
          </select>
        </div>
        <div className={styles.select_block}>
          <label className={styles.filter_input_label} htmlFor="student_number_select">학번 값</label>
          <select className={styles.select} name="student_number_select" onChange={
            (e) => props.handleFilterOption({
              id: props.filter.id,
              type: props.filter.type,
              value_range: props.filter.value_range,
              column: props.filter.column,
              conjunction: props.filter.conjunction,
              student_number: e.target.value
            })
          }>
            {createStudentNumberOption()}
          </select>
        </div>
      </div>
    </>
  );
}