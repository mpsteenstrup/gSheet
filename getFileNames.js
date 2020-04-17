function getFileNames(){
  var sheetName = 'Form Responses 1';
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var startRow = 1;  // First row of data to process
  var startCol = 7;
  var numRows = 10;
  var numCol = 1;
  // Number of rows to process
  var dataRange = sheet.getRange(startRow, startCol, numRows, numCol);
  var data = dataRange.getValues();

  for (var i = 1; i < data.length; ++i) {
    var row = data[i];
    id = row[0];
    if (id.length > 0){
      id = id.split("=")[1];
      var file = DriveApp.getFileById(id);
      var name = file.getName();
      sheet.getRange('H' + (i+1)).setValue(name);
    }
  }
}
