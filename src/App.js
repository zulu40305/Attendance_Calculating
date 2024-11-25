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
  const [filters, setFilters] = React.useState([]);
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

      if (endRow > exportRowCount) sheetExport.addRows(exportRowCount, endRow - exportRowCount);

      const data = sheetImport.getArray(startRow, startCol, endRow, endCol);
      sheetExport.setArray(0, 0, data);

      for (let row = startRow; row < endRow; row++) {
        const height = sheetImport.getRowHeight(row);
        sheetExport.setRowHeight(row, height);
      }

      for (let col = startCol; col < endCol; col++) {
        const width = sheetImport.getColumnWidth(col);
        sheetExport.setColumnWidth(col, width);
      }

    } else {
      alert("올바른 필터 범위를 입력해주세요! (대소문자 구분) \n Ex) A1:AB123456");
      return;
    }
  };

  const clearExport = () => {
    const sheet = spreadExport.getActiveSheet();

    sheet.clear(0, 0, sheet.getRowCount(), sheet.getColumnCount(), GC.Spread.Sheets.SheetArea.viewport, GC.Spread.Sheets.StorageType.data);
  }

  const addFilter = () => {
    setFilters([...filters, {'id': Math.random()}]);
  }

  const deleteFilter = (id) => {
    setFilters(filters.filter(f => f.id !== id));
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
            <h4 className={styles.option_subtitle}>데이터 필터 추가 - Create Data Filter</h4>
            <div className={styles.option_content}>
              <Button width="100%" btn="confirm" click={addFilter}>데이터 필터 추가</Button>
            </div>
            <h4 className={styles.option_subtitle}>필터 적용 범위 - Filter Coverage</h4>
            <div className={styles.option_content}>
              <input className={styles.text_input_full} type="text" placeholder="예) A1:G5" ref={filterRangeRef}/>
            </div>
            <div className={styles.option_content}>
              <Button width="9rem" btn="confirm" click={applyFilter}>적용하기</Button>
              <Button width="9rem" btn="cancel" click={clearExport}>출력 파일 초기화</Button>
            </div>
            <FilterBox filters={filters} delete={deleteFilter}/>
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