import styles from './FilterElement.module.css';

export default function DepartmentFilter(props) {

  const createColumnRangeOption = () => {
    const options = [];
    for (let i=65; i <= 'Z'.charCodeAt(0); i++) options.push(<option key={i-65} value={i-65}>{String.fromCharCode(i)}</option>);
    return options;
  }

  return (
    <>
      <div className={styles.filter}>
        <div className={styles.select_block}>
          <label className={styles.filter_type_label} htmlFor="filter_isEqual">일치 여부</label>
          <select className={styles.select} name="filter_isEqual" onChange={
            (e) => props.handleFilterOption({
              id: props.filter.id,
              type: props.filter.type,
              is_equal: e.target.value,
              column: props.filter.column,
              conjunction: props.filter.conjunction,
              department: props.filter.department
            })
          }>
            <option value="==">일치</option>
            <option value="!=">제외</option>
          </select>
        </div>
        <div className={styles.select_block}>
          <label className={styles.filter_type_label} htmlFor="filter_column_range">열 범위</label>
          <select className={styles.select} name="filter_column_range" onChange={
            (e) => props.handleFilterOption({
              id: props.filter.id,
              type: props.filter.type,
              is_equal: props.filter.is_equal,
              column: e.target.value,
              conjunction: props.filter.conjunction,
              department: props.filter.department
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
              is_equal: props.filter.is_equal,
              column: props.filter.column,
              conjunction: e.target.value,
              department: props.filter.department
            })
          }>
            <option value="&&">AND</option>
            <option value="||">OR</option>
          </select>
        </div>
      </div>
      <div className={styles.filter}>
        <label className={styles.filter_type_label} htmlFor="department_value">학부</label>
        <input className={styles.filter_input} type="text" name="department_value" placeholder="학부명을 입력해주세요"  onChange={
            (e) => props.handleFilterOption({
              id: props.filter.id,
              type: props.filter.type,
              is_equal: props.filter.type,
              column: props.filter.column,
              conjunction: props.filter.conjunction,
              department: e.target.value
            })
          } />
      </div>
    </>
  );
}