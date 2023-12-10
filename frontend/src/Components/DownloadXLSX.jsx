import React from "react";
import * as XLSX from "xlsx";
var ws;
export function DownloadXLSX({ data }) {
  const handleOnExport = () => {
    console.log(data);
    var wb = XLSX.utils.book_new();
    ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, "MyExcelSheet.xlsx");
  };
  return <button onClick={handleOnExport}>Export</button>;
}
