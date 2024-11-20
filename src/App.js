import styles from './App.module.css';
import React from 'react';
import * as GC from '@mescius/spread-sheets';
import { SpreadSheets, Worksheet } from '@mescius/spread-sheets-react';
import '@mescius/spread-sheets-shapes';
import '@mescius/spread-sheets-charts';
import '@mescius/spread-sheets-slicers';
import '@mescius/spread-sheets-pivot-addon';
import '@mescius/spread-sheets-io';
import '@mescius/spread-sheets-resources-ko';
import '@mescius/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css';
import { saveAs } from 'file-saver';
import Button from './components/Button';
import FileInput from './components/FileInput';
import TextInput from './components/TextInput';

GC.Spread.Common.CultureManager.culture('ko-kr');

function App() {
  const [exportName, setExportName] = React.useState("");
  const [spread, setSpread] = React.useState(null);

  let hostStyle = {
    width: '100%',
    height: '100%',
  };

  let initSpread = function (spread) {
    setSpread(spread);

    // let sheet = spread.getActiveSheet();
    // sheet
    //   .getCell(0, 0)
    //   .vAlign(GC.Spread.Sheets.VerticalAlign.center)
    //   .value('Hello SpreadJS!');
  };

  const ImportFile = () => {
    let file = document.getElementById('fileDemo').files[0];

    if (!file) {
      alert("파일을 선택해주세요!");
      return;
    }

    let fileType = file.name.split('.');
    if (fileType[fileType.length - 1] === 'xlsx') {
      spread.import(
        file,
        function () {},
        function (e) {
          console.log(e); // error callback
        },
        {
          // importxlsxoptions - https://developer.mescius.com/spreadjs/api/modules/GC.Spread.Sheets#importxlsxoptions
          fileType: GC.Spread.Sheets.FileType.excel,
        }
      );
    }
  };

  const Export_Excel = () => {
    let fileName = exportName;

    if (fileName.trim().length === 0) {
      alert("파일명을 입력해주세요!");
      return;
    }

    if (!fileName.endsWith('.xlsx')) fileName += '.xlsx';

    spread.export(
      function (blob) {
        saveAs(blob, fileName);
      },
      function (e) {
        console.log(e);
      },
      {
        // ExportXlsxOptions - https://developer.mescius.com/spreadjs/api/modules/GC.Spread.Sheets#exportxlsxoptions
        fileType: GC.Spread.Sheets.FileType.excel,
      }
    );
  };

  const getCellData = () => {
    let sheet = spread.getActiveSheet();
    // A1 데이터 가져오기
    let val = sheet.getValue(0, 0);
    console.log('A1-', val);
    // B2:D4 데이터 가져오기
    let arr = sheet.getArray(1, 1, 3, 3);
    console.log('B2:D4-', arr);
  };

  return (
    <div>
      <div className={styles.row}>
        <div className={styles.left}>
          <SpreadSheets
            workbookInitialized={(spread) => initSpread(spread)}
            hostStyle={hostStyle}
          >
            <Worksheet/>
          </SpreadSheets>
        </div>

        <div className={styles.right}>
          <div>
            <h4> Excel 가져오기 </h4>
            <FileInput name="files[]" accept=".xlsx" id="fileDemo"/>
            <Button click={ImportFile} content="불러오기"/>
          </div>
          <div>
            <h4> Excel 내보내기 </h4>
            파일명:
            <TextInput
              type="text"
              id="exportName"
              placeholder="Enter the file name"
              value={exportName}
              change={(e) => setExportName(e.target.value)}
            />
            <Button click={Export_Excel} content="내보내기"/>
          </div>
          <div>
            <h4> 특정 셀(Cell) 데이터 가져오기 </h4>
            <button onClick={getCellData}>콘솔로 A1 & B2:D4 값 가져오기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;