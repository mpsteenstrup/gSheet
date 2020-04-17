function genererHTMLfil() {
  var content='',fileName,newFile,dir;//Declare variable names

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
    console.log(id);
    if (id.length > 0){
      name = row[1] + "_" + row[2] + ".html";
      content = content + '<li><a href="' + name + '">' + row[2] + "</a>, " + row[3]  + ", " + row[4] + "</li>";
    }
  }
  content = '<ul>'+ content + '</ul>';
  dir = DriveApp.getFolderById("0Bxmwsa_ikksofmRtbWl3NUZBZ1piRFZSUHZZZVFVWlhBOHo0RTFnTFlJY00tZ0FBWk9sUlU");
  fileName = "test.html";
  newFile = dir.createFile(fileName, content);
}
