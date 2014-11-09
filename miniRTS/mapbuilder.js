

$(document).ready(function(){

window.grid = {
     '1-1' : ['b','h',10],
     '1-2' : ['b','t',6],
     '1-3' : ['e','x',10],
     '1-4' : ['e','x',10],
     '1-5' : ['e','x',10],
     '2-4' : ['r','s',5],
     '2-1' : ['e','o',10],
     '4-4' : ['r','h',2],
     '5-5' : ['r','f',5],
     '4-1' : ['e','b',10],
     '5-1' : ['e','b',10],
     '5-2' : ['e','b',10],
 };

 drawBuildings();

drawGrid(window.grid);

function onUnitPickClicked(e){
  var color = $(this).data('color');
  var unit = $(this).data('unit');
  console.log("Clicked unit! color " + color + " unit: " + unit);
  window.placingunit = [color,unit,10];

  doActiveUnitStuff('1-1',window.placingunit);
}

 $('#saveform').submit(function(e){
  e.preventDefault();
  console.log("Saving map!");
  var name = $('#mapname').val();
  if (name == ''){
    alert ("Please enter a name");
    return;
  }

  Data.saveMap(name,window.grid);
 });

 $('#grid').on('mousedown','.grid-cell',function(){
      var row = $(this).data('x');
      var col = $(this).data('y');
      console.log("Clicked grid coordinates " + row + "," + col);
      var key = coordsToKey(row,col);

      if (typeof(window.grid[key]) == 'undefined'){ //clicked empty cell
        if (typeof window.placingunit == 'undefined'){
          return alert ("First select a unit to place");
        }
        else {
            window.grid[key] = window.placingunit;
          }
      }
      else {
        delete(window.grid[key]);
      }

      drawGrid(window.grid);
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
  listEl.append($('<a href="">edit</a>'));
  $('#maplist').append(listEl);
});

});
