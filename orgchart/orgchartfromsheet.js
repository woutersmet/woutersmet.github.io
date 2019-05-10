
// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart','orgchart']});

// Client ID and API key from the Developer Console
var CLIENT_ID = '498555875533-ehs1pktc3k9pr35v87pctfarigdbjna2.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDMyCyqGXZ5n951uc4oRCQCQScoCac1oE8'; 

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    var authInstance = gapi.auth2.getAuthInstance();
    console.log('auth instancce:' , authInstance);
    
    window.accessToken = authInstance.currentUser.get().getAuthResponse().access_token;
    console.log("Access token: " + window.accessToken);
    // Listen for sign-in state changes.
    authInstance.isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(authInstance.isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  }, function(error) {
    console.log('Auth error:', error);
    appendPre(JSON.stringify(error, null, 2));
  });
}


/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    console.log('We are signed in! If there is a sheet id we can try to load it');
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'inline';
    //listMajors();
    listSheets(window.sheetid);
  } else {
      console.log('We are not signed in! Showing signin button');
          authorizeButton.style.display = 'inline';
          signoutButton.style.display = 'none';
        }
      }


/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  console.log('Signing in!');
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  console.log('Signing out!');
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

function sheetNameToId(sheetname){
   return 'tabbutton-' + sheetname.trim().toLowerCase().replace(' ', '-');
}

//source: https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/get
function listSheets(sheetid) {
  console.log("Listing sheets!");
  var params = {
    // The spreadsheet to request.
    spreadsheetId: sheetid, //'1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms'),  // same public one as below - Wouter

    // The ranges to retrieve from the spreadsheet.
    ranges: [],  // TODO: Update placeholder value.

    // True if grid data should be returned.
    // This parameter is ignored if a field mask was set in the request.
    includeGridData: false,  // TODO: Update placeholder value.
  };

  var request = gapi.client.sheets.spreadsheets.get(params);
  request.then(function(response) {
    // TODO: Change code below to process the `response` object:
    console.log(response.result);
    var sheets = response.result.sheets;
    for (var i =0;i<sheets.length;i++){
      var sheetname = sheets[i]['properties']['title'];
      var sheetid = sheetNameToId(sheetname)
      $('#sheets').append($('<a id="'+sheetid+'" class="tabbutton btn btn-default">'+sheetname+'</a>'))
    }

    //immediately load first sheet?
    loadChart(window.sheetid, sheets[0]['properties']['title']);

  }, function(reason) {
    console.error('error: ' + reason.result.error.message);
  });      
}

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
function listMajors() {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    range: 'Class Data!A2:E',
  }).then(function(response) {
    var range = response.result;
    if (range.values.length > 0) {
      appendPre('Name, Major:');
      for (i = 0; i < range.values.length; i++) {
        var row = range.values[i];
        // Print columns A and E, which correspond to indices 0 and 4.
        appendPre(row[0] + ', ' + row[4]);
      }
    } else {
      appendPre('No data found.');
    }
  }, function(response) {
    appendPre('Error: ' + response.result.error.message);
  });
}



// Set a callback to run when the Google Visualization API is loaded.
//google.charts.setOnLoadCallback(getSheetData);

//following https://google-developers.appspot.com/chart/interactive/docs/spreadsheets#sheet-name
function loadChart(sheetid, sheetname) {
console.log("Will load chart for sheet " + sheetid + " and tab" + sheetname);

var sheetId = sheetNameToId(sheetname);
$('.tabbutton').removeClass('btn-primary');
$('#' + sheetId).addClass('btn-primary');

var spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/'+sheetid; //default

//var sheetname = 'orgdata';
var range = 'A2:G999';

//something like:  'https://docs.google.com/spreadsheets/d/12akgYh-crO4jv7lrsJ5dVrtrXdsxORfLkWdVKNqme_M/gviz/tq?sheet=orgdata&range=A2:D205';
var src = spreadsheetUrl + '/gviz/tq?sheet=' + sheetname + '&range=' + range;

src += '&access_token=' + encodeURIComponent(window.accessToken);

console.log("Full url we will query: " + src);
var query = new google.visualization.Query(src);
query.send(handleSheetResponse);
}

function extractRow(dataFromSheet, i){
  var rowInfo = {
  title : dataFromSheet.getValue(i,0),
  subtitle : dataFromSheet.getValue(i,1),
  color : dataFromSheet.getValue(i,3),
  code : dataFromSheet.getValue(i,4),
  parentcode : dataFromSheet.getValue(i,5),
  avatar : dataFromSheet.getValue(i,2),
  };

  var background = rowInfo.color == null ? '#eee' : rowInfo.color;
  var styling = 'width:150px;background:'+background+';border:0;vertical-align:top;white-space:nowrap;';

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
  var subtitlePart = row.subtitle != null ? '<div class="node-subtitle">'+row.subtitle+'</div>' : '';
  var formatted = '<div class="node"><div class="node-header">'+imgPart+'<div class="node-title">' +row.title+ '</div></div>'+subtitlePart+'</div>';

  var newRow = [{v : row.code, f : formatted},row.parentcode,''];
  data.addRow(newRow);
  data.setRowProperty(i, 'style', row.styling);
  }

  //draw chart
  window.chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
  chart.draw(data, { allowHtml: true /*, height: 400 */});

  google.visualization.events.addListener(chart, 'select', handleChartSelect);

}

function tabClicked (){
    var sheetname = $(this).html();
    console.log("Clicked sheet: " + sheetname);
    loadChart(window.sheetid, sheetname);
}

function initSheetId(){
  var url = new URL(document.location.href);
  var sheetidfromurl = url.searchParams.get("sheetid");
  console.log("Sheet id from url:" + sheetidfromurl);
  if (typeof sheetidfromurl != 'undefined'){
    window.sheetid = sheetidfromurl;
  }
  else {
    console.log("Got no sheet id from url! Using default...");
    window.sheetid = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms';
  }
  console.log('Set sheet id to ' + window.sheetid);
  $('#sheetid').val(window.sheetid);
}

$('#sheets').on('click', '.tabbutton', tabClicked);

initSheetId();