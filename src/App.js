import './App.css';
import React, { useRef } from 'react';
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

GC.Spread.Common.CultureManager.culture('ko-kr');

function App() {
  const [minutes, setMinutes] = React.useState('export');
  const [spread, setSpread] = React.useState(null);

  let hostStyle = {
    width: '100%',
    height: '380px',
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
    let fileType = file.name.split('.');
    if (fileType[fileType.length - 1] == 'xlsx') {
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
    let fileName = document.getElementById('exportFileName').value;
    if (fileName.substr(-5, 5) !== '.xlsx') {
      fileName += '.xlsx';
    }
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
      <div className="row">
        <div className="left">
          <SpreadSheets
            workbookInitialized={(spread) => initSpread(spread)}
            hostStyle={hostStyle}
          >
            <Worksheet></Worksheet>
          </SpreadSheets>
        </div>

        <div className="right">
          <div>
            <h4> Excel 가져오기 </h4>
            <input type="file" name="files[]" id="fileDemo" accept=".xlsx" />
            <button onClick={ImportFile}>불러오기</button>
          </div>
          <div>
            <h4> Excel 내보내기 </h4>
            파일명:
            <input
              type="text"
              id="exportFileName"
              placeholder="Export file name"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
            />
            <Button function={Export_Excel} content="저장하기"/>
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