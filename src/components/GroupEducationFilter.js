import styles from './FilterElement.module.css';

export default function GroupEducationFilter(props) {

  const createColumnRangeOption = () => {
    const options = [];
    for (let i=65; i <= 'Z'.charCodeAt(0); i++) options.push(<option key={i-65} value={i-65}>{String.fromCharCode(i)}</option>);
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
              education_time: props.filter.education_time
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
              education_time: props.filter.education_time
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
              education_time: props.filter.education_time
            })
          }>
            <option value="&&">AND</option>
            <option value="||">OR</option>
          </select>
        </div>
      </div>
      <div className={styles.filter}>
        <label className={styles.filter_type_label} htmlFor="time">수강 시간</label>
        <input className={styles.filter_input} type="text" name="time" placeholder="ex) 0시간" onChange={
            (e) => props.handleFilterOption({
              id: props.filter.id,
              type: props.filter.type,
              value_range: props.filter.type,
              column: props.filter.column,
              conjunction: props.filter.conjunction,
              education_time: e.target.value,
            })
          } />
      </div>
    </>
  );
}