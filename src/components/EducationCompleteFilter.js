import styles from './FilterElement.module.css';

export default function EducationCompleteFilter(props) {

  const createColumnRangeOption = () => {
    const options = [];
    for (let i=65; i <= 'Z'.charCodeAt(0); i++) options.push(<option key={i-65} value={i-65}>{String.fromCharCode(i)}</option>);
    return options;
  }

  return (
    <>
      <div className={styles.filter}>
        <div className={styles.select_block}>
          <label className={styles.filter_type_label} htmlFor="filter_column_range">열 범위</label>
          <select className={styles.select} name="filter_column_range" onChange={
            (e) => props.handleFilterOption({
              id: props.filter.id,
              type: props.filter.type,
              column: e.target.value,
              conjunction: props.filter.conjunction,
              is_complete: props.filter.is_complete
            })
          }>
            {createColumnRangeOption()}
          </select>
        </div>
        <div className={styles.select_block}>
          <label className={styles.filter_type_label} htmlFor="filter_conjunction">필터 결합</label>
          <select className={styles.select} name="filter_conjunction" onChange={
            (e) => props.handleFilterOption({
              id: props.filter.id,
              type: props.filter.type,
              column: props.filter.column,
              conjunction: e.target.value,
              is_complete: props.filter.is_complete
            })
          }>
            <option value="&&">AND</option>
            <option value="||">OR</option>
          </select>
        </div>
      </div>
      <div className={styles.filter}>
        <div className={styles.select_block}>
          <label className={styles.filter_type_label} htmlFor="filter_value_range">수강 여부</label>
          <select className={styles.select} name="filter_value_range"  onChange={
            (e) => props.handleFilterOption({
                id: props.filter.id,
                type: props.filter.type,
                column: props.filter.column,
                conjunction: props.filter.conjunction,
                is_complete: e.target.value
              })
            }>
            <option value="1">완료 - 1</option>
            <option value="0">미완료 - 0</option>
          </select>
        </div>
      </div>
    </>
  );
}