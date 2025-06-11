import {  from, fromText, to, toText } from "../js/selectChange.js";
// [{ header: "序号", key: "index", width: 100 }] - excelHeader
// [{index:'对对对'}] - data
const exportJSONExcel = async (
  data = [],
  excelHeader = [],
  fileName = "多语言文本信息表",
  sheetName = "多语言文本信息表",
) => {
  const ExcelJSWorkbook = new ExcelJS.Workbook();
  const worksheet = ExcelJSWorkbook.addWorksheet(sheetName);
  worksheet.columns = excelHeader; //head;
  // 合并一系列单元格
  worksheet.mergeCells("A1:D1");
  worksheet.getCell("D1").value = "多语言文本信息表";
  worksheet.mergeCells("A2:D2");
  worksheet.getCell("D2").value = "导出人:开发者";
  worksheet.addRow({
    index: "多语言文本唯一编码",
    [from]: fromText,
    [to]: toText,
    notes: "备注",
  });
  worksheet.addRows(data);
  const file = await ExcelJSWorkbook.xlsx.writeBuffer();
  saveAs(
    new Blob([file], { type: "application/octet-stream" }),
    `${fileName}.xlsx`,
  );
};

export { exportJSONExcel };
