<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=default"></script>

# gSheet - hacks
$$ \pi = \int_0^\infty sin{\theta}$$

To scripts til at holde styr på filnavne når de uploades med google forms.

[getFileNames.js](getFileNames.js) tilføjer filnavnet til en række i g-sheets.

[setFileNames.js](setFileNames.js) ændre navnet på filerne i forhold til input fra spørgeskema.

[genererHTMLfil.js](genererHTMLfil.js), laver en html fil ud fra gSheet oplysninger.

Det er blevet brugt til at elever kan uploade .html filer og de kan samles på en gennem en fælles webside, med fornuftige referencer.


### getFileNames.js - gennemgået

Indlæser data fra regnearket 'Form Responses 1' til 'data'. Specificeren områder hvor data er.

``` var sheetName = 'Form Responses 1';
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var startRow = 1;
  var startCol = 7;
  var numRows = 10;
  var numCol = 1;
  var dataRange = sheet.getRange(startRow, startCol, numRows, numCol);
  var data = dataRange.getValues();
```

Iterere over alle rækker. Stien til filen bliver splittet i ved `=`  og den sidste del giver `id` på filen. `file = DriveApp.getFileById(id);` angiver filen og `file.getName()` giver navnet. Filnavnet bliver skrevet i kolonne `H` med række `i+1` .

```
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
```

## setFileNames - gennemgang
Samme grundstruktur som `getFileNames` men her bliver filnavnet ændret i forhold til svarene i spørgeskemaet, konkret klasse og navnet på programmet.

Hvis der er en fil bliver den navnet sammensat af klasse, `row[1]` og programnavn `row[2]`. Filen opdateres med `file.setName(name)`.

```
if (id.length > 0){
  name = row[1] + "_" + row[2] + ".html";
  id = id.split("=")[1];
  var file = DriveApp.getFileById(id);
  file.setName(name);
  var name = file.getName();
  sheet.getRange('H' + (i+1)).setValue(name);
}
```

## genererHTMLfil

generere html fil ud fra gSheet.
