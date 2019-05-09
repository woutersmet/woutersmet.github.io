// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart','orgchart']});

/*
* THE AUTH BIT
*/
// NOTE: You must replace the client id on the following line.
var clientId = '498555875533-ehs1pktc3k9pr35v87pctfarigdbjna2.apps.googleusercontent.com';
var scopes = 'https://www.googleapis.com/auth/spreadsheets.readonly'; //no need for edit etc: 'https://www.googleapis.com/auth/spreadsheets';
window.accessToken = false;

/*
function init() {
  console.log("Init auth;");
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},handleAuthResult);
}
*/

function handleAuthResult(authResult) {
  var authorizeButton = document.getElementById('authorize-button');
  if (authResult && !authResult.error) {
    console.log('Auth result: We are authorized! auth reseult:', authResult);
    //maybe show user here or something?
    window.accessToken = authResult.access_token;
    loadChart();
    $('#auth-todo').hide();
    $('#auth-done').show();
  } else {
    console.log('Auth result: we are not authorized yet! Showing button');
    $('#auth-todo').show();
    $('#auth-done').hide();
  }
}

function authorize() {
  console.log("Authorizing...");
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false},handleAuthResult);
  return false;
}

/*
* THE CHARTING BIT
*/


// Set a callback to run when the Google Visualization API is loaded.
//google.charts.setOnLoadCallback(getSheetData);

//following https://google-developers.appspot.com/chart/interactive/docs/spreadsheets#sheet-name
function loadChart() {
  
  var spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/12akgYh-crO4jv7lrsJ5dVrtrXdsxORfLkWdVKNqme_M'; //default
  var urlFromInput = $('#sheeturl').val();
  if (urlFromInput != ''){
      var editPos = urlFromInput.indexOf('/edit');
      if (editPos > 0) urlFromInput = urlFromInput.trim().substr(0,editPos);
      spreadsheetUrl = urlFromInput;
      Cookies.set('lastusedurl',spreadsheetUrl);
      console.log("We gebruiken url van in de input: " + spreadsheetUrl);
  }

  var sheetname = 'orgdata';
  var range = 'A2:Z999';

  //something like:  'https://docs.google.com/spreadsheets/d/12akgYh-crO4jv7lrsJ5dVrtrXdsxORfLkWdVKNqme_M/gviz/tq?sheet=orgdata&range=A2:D205';
  var src = spreadsheetUrl + '/gviz/tq?sheet=' + sheetname + '&range=' + range;

  //for sheet we need authentication for (see https://developers.google.com/chart/interactive/docs/spreadsheets)
  if (urlFromInput != ''){
      console.log("Using user-pasted url! We need accesstoken...");
      if (!accessToken){
        alert('Cannot load sheet: you have not authorized access to Google Sheets yet');
        authorize();
        return;
      }
      else {
        src += '&access_token=' + encodeURIComponent(accessToken);
      }
  }
  
  console.log("Full url we will query: " + src);
  var query = new google.visualization.Query(src);
  query.send(handleSheetResponse);
}

function extractRow(dataFromSheet, i){
  var rowInfo = {
    title : dataFromSheet.getValue(i,0),
    subtitle : dataFromSheet.getValue(i,1),
    avatar : dataFromSheet.getValue(i,2),
    color : dataFromSheet.getValue(i,3),
    code : dataFromSheet.getValue(i,4),
    parentcode : dataFromSheet.getValue(i,5),
  };

  var background = rowInfo.color == '' ? '#eee' : rowInfo.color;
  var styling = 'width:150px;background:'+background+';border:0;';

  rowInfo.styling = styling;

  return rowInfo;
}

function handleSheetResponse(response) {
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }

  var dataFromSheet = response.getDataTable();
  console.log("Source data: ", dataFromSheet);
  //transform data table to include html, pictures, bg etc?
  var size = dataFromSheet.getNumberOfRows();
  console.log("Size: " + size);
  
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Name');
  data.addColumn('string', 'Manager');
  data.addColumn('string', 'ToolTip');

  for (var i = 0; i<size;i++){
    var row = extractRow(dataFromSheet,i);
    console.log("Formatting person at index " + i, row);

    var formatted = '<div class="node"><div class="node-header"><img class="node-avatar" src="'+row.avatar+'" /><div class="node-title">' +row.title+ '</div></div><div class="node-subtitle">'+row.subtitle+'</div></div>';
    
    var newRow = [{v : row.code, f : formatted},row.parentcode,''];
    data.addRow(newRow);
    data.setRowProperty(i, 'style', row.styling);
  }
  
  //var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
  var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
  chart.draw(data, { allowHtml: true /*, height: 400 */});
}

$(document).ready(function(){
    var urlFromCookie = Cookies.get('lastusedurl');
    if (typeof urlFromCookie != 'undefined' && urlFromCookie != ''){
      console.log("We have a url in cookie! " + urlFromCookie);
      $('#sheeturl').val(urlFromCookie);
    }

    $('#loadbutton').click(loadChart);
});