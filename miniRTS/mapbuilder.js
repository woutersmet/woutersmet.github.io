

$(document).ready(function(){

window.map = {
  name : 'whatever',
  grid : {
     cells : {
     '1-1' : ['b','h',10],
     '1-2' : ['b','t',10],
     '2-1' : ['e','o',10],
     '3-1' : ['b','s',10],
     '4-1' : ['e','b',10],
     '2-5' : ['r','s',10],
     '4-4' : ['r','t',10],
     '5-1' : ['e','b',10],
     '5-4' : ['e','b',10],
     '5-5' : ['r','h',10]
     },
     cols : 5,
     rows : 5
   }
 };

drawGrid($('#grid'),window.map.grid);

function fillSizes(){
  var max = 12;
  for (var i=2;i<=12;i++){
    var sel = $('<option value="'+i+'">'+i+'</option>');
    var sel2 = $('<option value="'+i+'">'+i+'</option>');
    if (i==5) {
      sel.attr('selected','selected');
      sel2.attr('selected','selected');
    }
    $('#colsselect').append(sel);
    $('#rowsselect').append(sel2);
  }
}

fillSizes();

function onUnitPickClicked(e){
  var color = $(this).data('color');
  var unit = $(this).data('unit');
  console.log("Clicked unit! color " + color + " unit: " + unit);
  window.placingunit = [color,unit,10];

  doActiveUnitStuff('1-1',window.placingunit);
}

$('#saveform').change(function(e){
  window.map.grid.cols = $('#colsselect').val();
  window.map.grid.rows = $('#rowsselect').val();
  console.log(window.map.grid);
  drawGrid($('#grid'),window.map.grid);
});

 $('#saveform').submit(function(e){
  e.preventDefault();
  console.log("Saving map!");
  var name = $('#mapname').val();
  if (name == ''){
    alert ("Please enter a name");
    return;
  }

  Data.saveMap(name,getUserName(),window.map.grid);
 });

 $('#grid').on('mousedown','.grid-cell',function(){
      var row = $(this).data('row');
      var col = $(this).data('col');
      console.log("Clicked grid coordinates " + row + "," + col);
      var key = coordsToKey(row,col);

      if (typeof(window.map.grid.cells[key]) == 'undefined'){ //clicked empty cell
        if (typeof window.placingunit == 'undefined'){
          return alert ("First select a unit to place");
        }
        else {
            window.map.grid.cells[key] = window.placingunit;
          }
      }
      else {
        delete(window.map.grid.cells[key]);
      }

      drawGrid($('#grid'),window.map.grid);
 });

function setupMenu(){
  console.log("Setting up menu...");
  var envAlreadyDone = [];
  //player units
  for (color in window.colors){
    if (!window.colors.hasOwnProperty(color)) continue;
    for (unit in window.units){
      if (!window.units.hasOwnProperty(unit)) continue;
      unitdata = window.units[unit];
      if (unitdata.type == 'environment') {
        if ( envAlreadyDone.indexOf(unit) > -1) continue;
        color = 'e';
        envAlreadyDone.push(unit);
      }

        var id = 'unitpicker-'+color+'-' + unitdata.type + 's';
        var src = getUnitPath(color,unit,'f');
        var img = $('<img class="unit unit-picker" src="' + src + '">');

      img.data('color',color);
      img.data('unit',unit);
      img.click(onUnitPickClicked);
      $('#' + id).append(img);
    }
  }
}

setupMenu();

Data.getMaps(function(map){
  console.log("Getting maps");
  console.log(map);
  var listEl = $('<li class="listedmap">' + map.name + '</li>');
  listEl.append($('<a href="mapbuilder.html?mapname='+map.name+'">edit</a>'));
  $('#maplist').append(listEl);
});

});
