 window.game = {};
 window.playercolor = 'b';
 window.game.mousemode = {state : 'nothing'};

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

$(document).ready(function(){

 $('#grid').on('mousedown','.grid-cell',function(){
    var x = $(this).data('x');
    var y = $(this).data('y');
    console.log("Clicked grid coordinates " + x + "," + y);
    window.draggingfrom = x+'-'+y;
    var clickedUnit = window.grid[window.draggingfrom];
    if (typeof clickedUnit != 'undefined'){
      doActiveUnitStuff(window.draggingfrom,clickedUnit);
      if (isBuilding(clickedUnit[1])){ //clicked building!
      }
      else {
        window.draggingunit = window.grid[window.draggingfrom];
        console.log ("Dragging unit:" + clickedUnit);
      }
    }
    else {
      window.draggingunit = false;
    }
 });

 function moveUnit(unit,from,to){
    console.log("Moving unit ["+unit+"] from " + from + " to " + to);

    //regular move
    if (to == from) {
      //no movement!
    }
    else if (typeof window.grid[to] == 'undefined'){ //good to move unit
      delete(window.grid[from]);
      window.grid[to] = unit;
    }
    else if (window.grid[to][0] == 'e'){ //environment! cannot move there
        //
    }
    else {
      //attack!
      var attackedunit = window.grid[to];
      attackedunit[2] = attackedunit[2] - 1;

      if (attackedunit[2] <= 0) { //unit death!
        delete(window.grid[to]);
      }
      else {
        window.grid[to] = attackedunit;
      }
      console.log("Attack! Location " + to + " now has unit: " + attackedunit);
      explode(to);
    }

   drawGrid(window.grid);
 }

 $('#grid').mouseup(function(e){
  var gridsize = 30;
    var cos = $('#grid').offset();
    var pxX = e.pageX - cos.left;
    var pxY = e.pageY - cos.top;
    var cellY = 1 + Math.floor(pxX/30);
    var cellX = 1 + Math.floor(pxY/30);
    //console.log(cos);
    //console.log('mouseup on ' + pxX + ',' + pxY + ' cell: ' + cellX + ',' + cellY);
    var dest = cellX +'-' + cellY;
    if (window.draggingunit){
      window.draggingfrom;
      moveUnit(window.draggingunit,window.draggingfrom,dest);
      window.draggingunit = false;
    }
 });

 drawGrid(window.grid);
 drawBuildings();

//maps to start new game

Data.getMaps(function(map){
  console.log("Getting maps");
  console.log(map);
  var listEl = $('<option value="'+map.name+'">' + map.name + '</option>');
  $('#mapselect').append(listEl);
});

$('#creategameform').submit(function(e){
  e.preventDefault();
  alert('here');
  var mapname = $('#mapselect').val();
  var playername = 'testuser';
  Data.createGame(mapname, playername, function(game){
    console.log("Game created! Navigate to it?");
  });
});

});
