/*
* THE AUTH BIT
*/
// NOTE: You must replace the client id on the following line.
var clientId = '498555875533-ehs1pktc3k9pr35v87pctfarigdbjna2.apps.googleusercontent.com';
var scopes = 'https://www.googleapis.com/auth/spreadsheets.readonly'; //no need for edit etc: 'https://www.googleapis.com/auth/spreadsheets';
var accessToken = false;

function init() {
  console.log("Init auth;")
  gapi.auth.authorize(
      {client_id: clientId, scope: scopes, immediate: true},
      handleAuthResult);
}

function handleAuthResult(authResult) {
  console.log("Handling auth result:", authResult);
  var authorizeButton = document.getElementById('authorize-button');
  if (authResult && !authResult.error) {
    console.log('We are authorized! auth reseult:', authResult);
    //maybe show user here or something?
    //makeApiCall();
    accessToken = authResult.access_token;
    loadChart();
  } else {
    console.log('We are not authorized yet! Showing button');
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
  }
}

function handleAuthClick(event) {
  console.log("Handling auth click");
  gapi.auth.authorize(
      {client_id: clientId, scope: scopes, immediate: false},
      handleAuthResult);
  return false;
}

/*
function makeApiCall() {
  console.log("Making test api call");
  // Note: The below spreadsheet is "Public on the web" and will work
  // with or without an OAuth token.  For a better test, replace this
  // URL with a private spreadsheet.
  var tqUrl = 'https://docs.google.com/spreadsheets' +
      '/d/1XWJLkAwch5GXAt_7zOFDcg8Wm8Xv29_8PWuuW15qmAE/gviz/tq' +
      '?tqx=responseHandler:handleTqResponse' +
      '&access_token=' + encodeURIComponent(gapi.auth.getToken().access_token);

  document.write('<script src="' + tqUrl +'" type="text/javascript"></script>');
}

function handleTqResponse(resp) {
  document.write(JSON.stringify(resp));
}
*/

/*
* THE CHARTING BIT
*/


      // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart','orgchart']});

      // Set a callback to run when the Google Visualization API is loaded.
      //google.charts.setOnLoadCallback(drawChart);
      google.charts.setOnLoadCallback(getSheetData);

      //following https://google-developers.appspot.com/chart/interactive/docs/spreadsheets#sheet-name
      function getSheetData() {
        var tokenNeeded = true;

        var spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/12akgYh-crO4jv7lrsJ5dVrtrXdsxORfLkWdVKNqme_M';

        var urlFromInput = $('#sheeturl').val();
        if (urlFromInput != ''){
            var urlZonderEdit = urlFromInput.trim().substr(0,urlFromInput.indexOf('/edit'));
            spreadsheetUrl = urlZonderEdit;
            console.log("We gebruiken url in de input: " + spreadsheetUrl);
        }

        var sheetname = 'orgdata';
        var range = 'A2:Z999';

        //something like: 
        //var src = 'https://docs.google.com/spreadsheets/d/12akgYh-crO4jv7lrsJ5dVrtrXdsxORfLkWdVKNqme_M/gviz/tq?sheet=orgdata&range=A2:D205';
        var src = spreadsheetUrl + '/gviz/tq?sheet=' + sheetname + '&range=' + range;

        //for sheet we need authentication for (see https://developers.google.com/chart/interactive/docs/spreadsheets)
        if (tokenNeeded){
          if (!accessToken){
            alert('Cannot load sheet: you have not authorized the access to Google Sheets yet');
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
          fullname : dataFromSheet.getValue(i,0),
          firstname : dataFromSheet.getValue(i,1),
          lastname : dataFromSheet.getValue(i,2),
          role : dataFromSheet.getValue(i,3),
          department : dataFromSheet.getValue(i,4),
          team : dataFromSheet.getValue(i,5),
          manager : dataFromSheet.getValue(i,6),
          avatar : dataFromSheet.getValue(i,7),
        };

        var background =  rowInfo.department == 'Product' ? '#ffff88' : '#aaddff';
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

          var formatted = '<div class="node-header"><img class="node-avatar" src="'+row.avatar+'" /><div class="node-name">' +row.fullname+ '</div><div class="node-role">'+row.role+'</div></div>';
          formatted += '<div class="node-info">'+row.role+'<br /><div class="node-team">'+row.team+'</div></div>';

          var newRow = [{v : row.fullname, f : formatted},row.manager,''];
          data.addRow(newRow);
          data.setRowProperty(i, 'style', row.styling);
        }
        
        //var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
        var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
        chart.draw(data, { allowHtml: true /*, height: 400 */});
      }

      function loadChart(){
        console.log("Loading chart...");
        getSheetData();
      }