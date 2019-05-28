
// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart','orgchart']});

// Set a callback to run when the Google Visualization API is loaded.
//google.charts.setOnLoadCallback(getSheetData);

//following https://google-developers.appspot.com/chart/interactive/docs/spreadsheets#sheet-name
function loadChart(sheetid, sheetname) {
  console.log("Will load chart for sheet " + sheetid + " and tab" + sheetname);

  if ($('.tabbutton').length > 0){
    var sheetId = sheetNameToId(sheetname);
    $('.tabbutton').removeClass('btn-primary');
    $('#' + sheetId).addClass('btn-primary');
  }

  var spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/'+sheetid; //default

  //var sheetname = 'orgdata';
  var range = 'A2:H999';

  //something like:  'https://docs.google.com/spreadsheets/d/12akgYh-crO4jv7lrsJ5dVrtrXdsxORfLkWdVKNqme_M/gviz/tq?sheet=orgdata&range=A2:D205';
  var src = spreadsheetUrl + '/gviz/tq?sheet=' + sheetname + '&range=' + range;

  if (window.accessToken) src += '&access_token=' + encodeURIComponent(window.accessToken);

  console.log("Full url we will query: " + src);
  var query = new google.visualization.Query(src);
  query.send(handleSheetResponse);
}

function extractRow(dataFromSheet, i){
  var rowInfo = {
  title : dataFromSheet.getValue(i,0),
  subtitle : dataFromSheet.getValue(i,1),
  subsubtitle : dataFromSheet.getValue(i,2),
  avatar : dataFromSheet.getValue(i,3),
  color : dataFromSheet.getValue(i,4),
  code : dataFromSheet.getValue(i,5),
  parentcode : dataFromSheet.getValue(i,6),
  popupdetails : dataFromSheet.getValue(i,7),
  };

  var background = rowInfo.color == null ? '#eee' : rowInfo.color;
  var styling = 'background:'+background+';';

  rowInfo.styling = styling;

  return rowInfo;
}

//sourcce: https://developers.google.com/chart/interactive/docs/basic_interactivity
function handleChartSelect() {
var selectedItem = window.chart.getSelection()[0];
if (selectedItem) {
  var index = selectedItem.row;
  console.log("Selected index: ", index);

  var row = rows[index];
  console.log("Row selected:", row);
  //var topping = data.getValue(selectedItem.row, 0);
  //alert('Chart selected!');
  $('#modal-image').attr('src', row.avatar);
  $('#modal-title').html(row.title);
  $('#modal-subtitle').html(row.subtitle);
  $('#modal-details').html(row.popupdetails);
  $('#node_modal').modal();
  }
}

function handleSheetResponse(response) {
  if (response.isError()) return alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());

  //build data from sheet
  var dataFromSheet = response.getDataTable();
  console.log("Source data: ", dataFromSheet);
  //transform data table to include html, pictures, bg etc?
  var size = dataFromSheet.getNumberOfRows();
  console.log("Size: " + size);

  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Name');
  data.addColumn('string', 'Manager');
  data.addColumn('string', 'ToolTip');

  window.rows = [];
  for (var i = 0; i<size;i++){
    var sheetrow = extractRow(dataFromSheet,i);
    if (typeof sheetrow != 'undefined'){
      if (sheetrow.parentcode == 'PARENT' || sheetrow.parentcode == '^' && prevrow != null) sheetrow.parentcode = prevrow.code;
      rows.push(sheetrow);
      var prevrow = sheetrow;
    }
  }
  console.log("Rows to display:", rows);

  //build chart data
  for (var i = 0; i<size;i++){
  var row = rows[i];
  if (typeof row == 'undefined') continue;

  var imgPart = row.avatar != null ? '<img class="node-avatar" src="'+row.avatar+'" />' : ''
  var subtitlePart = row.subtitle != null  ? '<div class="node-subtitle">'+row.subtitle+'</div>' : '';
  var subsubtitlePart = row.subsubtitle != null  ? '<div class="node-subsubtitle">'+row.subsubtitle+'</div>' : '';
  var formatted = '<div class="node"><div class="node-header">'+imgPart+'<div class="node-title">' +row.title+ '</div><div style="clear:both;"></div></div>'+subtitlePart+subsubtitlePart+'</div>';

  var newRow = [{v : row.code, f : formatted},row.parentcode,''];
  data.addRow(newRow);
  data.setRowProperty(i, 'style', row.styling);
  }

  //draw chart
  window.chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
  chart.draw(data, { allowHtml: true /*, height: 400 */});

  google.visualization.events.addListener(chart, 'select', handleChartSelect);

}