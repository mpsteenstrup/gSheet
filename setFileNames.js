function setFileNames(){
  var sheetName = 'Form Responses 1';
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var startRow = 1;  // First row of data to process
  var startCol = 1;
  var numRows = 40;
  var numCol = 10;
  // Number of rows to process
  var dataRange = sheet.getRange(startRow, startCol, numRows, numCol);
  var data = dataRange.getValues();

  for (var i = 1; i < data.length; ++i) {
    var row = data[i];
    id = row[6];
    if (id.length > 0){
      name = row[1] + "_" + row[2] + ".html";
      id = id.split("=")[1];
      var file = DriveApp.getFileById(id);
      file.setName(name);
      var name = file.getName();
      sheet.getRange('H' + (i+1)).setValue(name);
    }
  }
}
