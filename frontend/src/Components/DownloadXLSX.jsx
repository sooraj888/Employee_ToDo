// Downloading XLSX functionality

import React from "react";
import * as XLSX from "xlsx";
var ws;
export function DownloadXLSX({ data }) {
  const handleOnExport = () => {
    try {
      var wb = XLSX.utils.book_new();
      ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
      XLSX.writeFile(wb, "MyExcelSheet.xlsx");
    } catch (e) {}
  };
  return <button onClick={handleOnExport}>Download</button>;
}
