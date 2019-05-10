
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

