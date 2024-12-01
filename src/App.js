import React, { useRef } from 'react';
import * as GC from '@mescius/spread-sheets';
import { SpreadSheets, Worksheet } from '@mescius/spread-sheets-react';
import { saveAs } from 'file-saver';
import '@mescius/spread-sheets-shapes';
import '@mescius/spread-sheets-charts';
import '@mescius/spread-sheets-slicers';
import '@mescius/spread-sheets-pivot-addon';
import '@mescius/spread-sheets-io';
import '@mescius/spread-sheets-resources-ko';
import '@mescius/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css';
import Button from './components/Button';
import FileInput from './components/FileInput';
import SheetContainer from './components/SheetContainer';
import Sidebar from './components/Sidebar';
import FilterBox from './components/FilterBox';
import styles from './App.module.css';

GC.Spread.Common.CultureManager.culture('ko-kr');

function App() {
  const exportNameRef = useRef(null);
  const filterRangeRef = useRef(null);
  const [spreadImport, setSpreadImport] = React.useState(null);
  const [spreadExport, setSpreadExport] = React.useState(null);
  const [filters, setFilters] = React.useState([
    {id: "1", type: "student_number", value_range: "==", column: "0", student_number: "00"},
    {id: "2", type: "department", equivalence: "all", column: "0", department: ""},
    {id: "3", type: "online_education", value_range: "==", column: "0", education_time: "0"},
    {id: "4", type: "group_education", value_range: "==", column: "0", education_time: "0"},
    {id: "5", type: "education_complete", column: "0", is_complete: "1"}
  ]);
  const hostStyle = useRef({width: '100%', height: '100%',});
  const regex = new RegExp(/^[A-Z]{1,2}[1-9][0-9]{0,5}:[A-Z]{1,2}[1-9][0-9]{0,5}$/);

  const initSpreadImport = function (spread) {
    setSpreadImport(spread);
  };

  const initSpreadExport = function (spread) {
    setSpreadExport(spread);
  };

  const ImportFile = () => {
    let file = document.getElementById('fileDemo').files[0];

    if (!file) {
      alert("파일을 선택해주세요!");
      return;
    }

    let fileType = file.name.split('.');
    if (fileType[fileType.length - 1] === 'xlsx') {
      spreadImport.import(
        file,
        function () {},
        function (e) {
          console.log(e);
        },
        {
          fileType: GC.Spread.Sheets.FileType.excel,
        }
      );
    }
  };

  const Export_Excel = () => {
    let fileName = exportNameRef.current.value;

    if (fileName.trim().length === 0) {
      alert("파일명을 입력해주세요!");
      return;
    }

    if (!fileName.endsWith('.xlsx')) fileName += '.xlsx';

    spreadExport.export(
      function (blob) {
        saveAs(blob, fileName);
      },
      function (e) {
        console.log(e);
      },
      {
        fileType: GC.Spread.Sheets.FileType.excel,
      }
    );
  };

  const filterRangeSetter = (range) => {
    let result = { 'left_row': 0, 'left_col': 0, 'right_row': 0, 'right_col': 0 };
    const [left, right] = range.split(':');
    const left_col_str = left.replace(/[0-9]/g, '');
    const right_col_str = right.replace(/[0-9]/g, '');

    result.left_row = parseInt(left.replace(/[A-Za-z]/g, '')) - 1;
    result.right_row = parseInt(right.replace(/[A-Za-z]/g, '')) - 1;

    if (left_col_str.length > 1) result.left_col = (26 * (left_col_str.charCodeAt(0) - 64) + (left_col_str.charCodeAt(1) - 64)) - 1;
    else result.left_col = parseInt(left_col_str.charCodeAt(0)) - 65;

    if (right_col_str.length > 1) result.right_col = (26 * (right_col_str.charCodeAt(0) - 64) + (right_col_str.charCodeAt(1) - 64)) - 1;
    else result.right_col = parseInt(right_col_str.charCodeAt(0)) - 65;

    return result;
  }

  const applyFilter = () => {
    const filterRange = filterRangeRef.current.value.trim();
    if (filterRange !== "" && regex.test(filterRange)) {
      clearExport();
      const range = filterRangeSetter(filterRange);
      const startRow = range.left_row;
      const startCol = range.left_col;
      const endRow = range.right_row - range.left_row + 1;
      const endCol = range.right_col - range.left_col + 1;

      if (endRow < 1 || endCol < 1) {
        alert("잘못된 필터 범위입니다!");
        return;
      }

      const sheetImport = spreadImport.getActiveSheet();
      const sheetExport = spreadExport.getActiveSheet();
      const exportRowCount = sheetExport.getRowCount();
      const data = sheetImport.getArray(startRow, startCol, endRow, endCol);

      if (endRow > exportRowCount) sheetExport.addRows(exportRowCount, endRow - exportRowCount);

      for (let col = startCol; col < endCol; col++) {
        const width = sheetImport.getColumnWidth(col);
        sheetExport.setColumnWidth(col, width);
      }

      let filteredData, result = [];

      const refinedData = data.map(d => {
        let refinedRow = []; 
        
        d.forEach((e, i) => {
          switch (i) {
            case parseInt(filters[0].column):
              refinedRow[filters[0].column] = e;
              break;

            case parseInt(filters[1].column):
              refinedRow[filters[1].column] = e;
              break;

            case parseInt(filters[2].column):
              e != null || undefined ?
              refinedRow[filters[2].column] = e.replace(/\D/g, "") :
              refinedRow[filters[2].column] = "0";
              break;

            case parseInt(filters[3].column):
              e != null || undefined ?
              refinedRow[filters[3].column] = e.replace(/\d+월\s*\d+일|시간/g, "").trim() : 
              refinedRow[filters[3].column] = "0";
              break;

            case parseInt(filters[4].column):
              e != null || undefined ?
              refinedRow[filters[4].column] = e :
              refinedRow[filters[4].column] = "0";
              break;

            default:
              refinedRow[i] = e;
          }
        });
        return refinedRow;
      });
      try {
        filteredData = refinedData
        .filter(data => eval(`${parseInt(data[filters[0].column].slice(1, 3))} ${filters[0].value_range} ${parseInt(filters[0].student_number)}`))
        .filter(
          data =>
          filters[1].equivalence == "all" ?
          true :
          filters[1].equivalence == "==" ?
          data[filters[1].column] == filters[1].department :
          data[filters[1].column] != filters[1].department
        )
        .filter(data => eval(`${parseInt(data[filters[2].column])} ${filters[2].value_range} ${parseInt(filters[2].education_time)}`))
        .filter(data => eval(`${parseInt(data[filters[3].column])} ${filters[3].value_range} ${parseInt(filters[3].education_time)}`))
        .filter(data => data[filters[4].column] == filters[4].is_complete);
      } catch (e) {
        alert(e.name + " 열 위치 혹은 필터 범위 설정에 오류가 발생하였습니다! 올바른 값을 설정하였는지 확인해주세요!");
        return;
      }

      for (let element of filteredData) result.push(data[element[0] - 1]);

      sheetExport.setArray(0, 0, result);
      alert("필터가 적용되었습니다!");
    } else {
      alert("올바른 필터 범위를 입력해주세요! (대소문자 구분) \n Ex) A1:AB123456");
      return;
    }
  };

  const clearExport = () => {
    const sheet = spreadExport.getActiveSheet();

    sheet.clear(0, 0, sheet.getRowCount(), sheet.getColumnCount(), GC.Spread.Sheets.SheetArea.viewport, GC.Spread.Sheets.StorageType.data);
  }

  const handleStudentNumber = (data) => {
    setFilters((prevFilters) =>
      prevFilters.map((filter) => {
        if (filter.id === data.id) {
          return {
            id: filter.id,
            type: data.type,
            value_range: data.value_range,
            column: data.column,
            student_number: data.student_number
          };
        }
        return filter;
      })
    );
  }

  const handleDepartment = (data) => {
    setFilters((prevFilters) =>
      prevFilters.map((filter) => {
        if (filter.id === data.id) {
          return {
            id: filter.id,
            type: data.type,
            equivalence: data.equivalence,
            column: data.column,
            department: data.department
          };
        }
        return filter;
      })
    );
  }

  const handleOnlineEducation = (data) => {
    setFilters((prevFilters) =>
      prevFilters.map((filter) => {
        if (filter.id === data.id) {
          return {
            id: filter.id,
            type: data.type,
            value_range: data.value_range,
            column: data.column,
            education_time: data.education_time
          };
        }
        return filter;
      })
    );
  }

  const handleGroupEducation = (data) => {
    setFilters((prevFilters) =>
      prevFilters.map((filter) => {
        if (filter.id === data.id) {
          return {
            id: filter.id,
            type: data.type,
            value_range: data.value_range,
            column: data.column,
            education_time: data.education_time
          };
        }
        return filter;
      })
    );
  }
  
  const handleEducationComplete = (data) => {
    setFilters((prevFilters) =>
      prevFilters.map((filter) => {
        if (filter.id === data.id) {
          return {
            id: filter.id,
            type: data.type,
            column: data.column,
            is_complete: data.is_complete
          };
        }
        return filter;
      })
    );
  }

  return (
    <>
      <Sidebar width="25">
        <div className={styles.option_container}>
          <div className={styles.option_block}>
            <h3 className={styles.option_title}>엑셀 불러오기 - Excel Import</h3>
            <div className={styles.option_content}>
              <FileInput name="files[]" accept=".xlsx" id="fileDemo"/>
              <Button btn="confirm" click={ImportFile}>불러오기</Button>
            </div>
          </div>
          <div className={styles.option_block}>
            <h3 className={styles.option_title}>엑셀 내보내기 - Excel Export</h3>
            <div className={styles.option_content}>
              <input  className={styles.text_input} id="exportName" type="text" placeholder="파일명을 입력해주세요" ref={exportNameRef}/>
              <Button btn="confirm" click={Export_Excel}>내보내기</Button>
            </div>
          </div>
          <div className={styles.option_block}>
            <h3 className={styles.option_title}>데이터 필터 - Data Filter</h3>
            <h4 className={styles.option_subtitle}>필터 적용 범위 - Filter Coverage</h4>
            <div className={styles.option_content}>
              <input className={styles.text_input_full} type="text" placeholder="예) A1:G5" ref={filterRangeRef}/>
            </div>
            <div className={styles.option_content}>
              <Button width="9rem" btn="confirm" click={applyFilter}>적용하기</Button>
              <Button width="9rem" btn="cancel" click={clearExport}>출력 파일 초기화</Button>
            </div>
            <FilterBox 
              filters={filters} 
              handleStudentNumber={handleStudentNumber}
              handleDepartment={handleDepartment}
              handleOnlineEducation={handleOnlineEducation}
              handleGroupEducation={handleGroupEducation}
              handleEducationComplete={handleEducationComplete}
            />
          </div>
        </div>
      </Sidebar>
      <div className={styles.main}>
        <SheetContainer label="가져온 파일 - Imported File">
          <SpreadSheets workbookInitialized={(spreadImport) => initSpreadImport(spreadImport)} hostStyle={hostStyle}>
            <Worksheet/>
          </SpreadSheets>
        </SheetContainer> 
        <SheetContainer label="출력 파일 - Export File">
          <SpreadSheets workbookInitialized={(spreadExport) => initSpreadExport(spreadExport)} hostStyle={hostStyle}>
            <Worksheet/>
          </SpreadSheets>
        </SheetContainer>
      </div>
    </>
  );
}

export default App;