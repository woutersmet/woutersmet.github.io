// window.game = {};

/*
window.game.grid = {
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
 */

$(document).ready(function(){

 $('#grid').on('mousedown','.grid-cell',function(){
    var row = $(this).data('row');
    var col = $(this).data('col');
    console.log("Clicked grid coordinates " + row + "," + col);
    var locationClicked = coordsToKey(row,col);
    var clickedUnit = window.game.grid[locationClicked];

    if (window.draggingunit && window.mousemode == 'CLICK'){ //in click (mobile) mode, this can move a unit!
        console.log("in click mode, moving a unit, and clicked an empty cell! Moving");
        var to = coordsToKey(row,col);
        moveUnit(window.draggingunit,window.draggingfrom,locationClicked);
        window.draggingunit = false;
      }
      else {
        if (typeof clickedUnit != 'undefined'){
          doActiveUnitStuff(window.draggingfrom,clickedUnit);

          window.draggingfrom = locationClicked;

          if (window.playercolor == clickedUnit[0] && !isBuilding(clickedUnit[1])){ //clicked draggable!
            window.draggingunit = clickedUnit;
            console.log ("Dragging unit:" + clickedUnit);
          }
        }
        else {
          window.draggingunit = false;
        }
      }
 });

 function moveUnit(unit,from,to){
    console.log("Moving unit ["+unit+"] from " + from + " to " + to);

    //deep copy, assure window.game isnt changed by our changes, just pushing to server  - see http://stackoverflow.com/questions/5364650/cloning-an-object-in-javascript
    var newgamestate = $.extend(true, {}, window.game);
    //regular move
    if (to == from) {
      //no movement!
    }
    else if (typeof newgamestate.grid[to] == 'undefined'){ //good to move unit
      delete(newgamestate.grid[from]);
      newgamestate.grid[to] = unit;
    }
    else if (newgamestate.grid[to][0] == 'e'){ //environment! cannot move there
        console.log("Dragging to environment! No movement allowed - just redraw grid");
        drawGrid(newgamestate.grid,newgamestate.grid);
    }
    else {
      //attack!
      var attackedunit = newgamestate.grid[to];
      attackedunit[2] = attackedunit[2] - 1;

      if (attackedunit[2] <= 0) { //unit death!
        delete(newgamestate.grid[to]);
      }
      else {
        newgamestate.grid[to] = attackedunit;
      }
      console.log("Attack! Location " + to + " now has unit: " + attackedunit);
      //explode(to);
    }

    console.log(newgamestate);
   Data.updateGame(newgamestate.id,newgamestate);
   //drawGrid(window.game.grid);
 }

 $('#grid').mouseup(function(e){
  if (window.mousemode == 'CLICK') return; //here it all happens on mousedown

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
        //console.log("Mouse mode drag, so mouse up is when to move unit!");
        moveUnit(window.draggingunit,window.draggingfrom,dest);
        window.draggingunit = false;
      }
 });

 //drawGrid(window.game.grid); //see starting game logic

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
    console.log("Game id: " + game.id);
    alert("Game created! Will now navigate to it...");
    document.location.href = 'index.html?gameid=' + game.id;
  });
});

//getting a game
var urlvars = getUrlVars();

 window.playercolor = 'b';
 //window.game.mousemode = {state : 'nothing'};

function onGameChanged (snapshot) {
  console.log("Game changed!");
  var newgame = snapshot.val();
  if (typeof (window.game) == 'undefined') window.game = newgame;

  drawGrid(newgame.grid, window.game.grid);
  window.game = newgame;
}

if (typeof(urlvars.gameid) !== 'undefined'){
  console.log("We're in a game!");
  Data.getGame(urlvars.gameid,function(game){
    console.log("Game loaded:");
    console.log(game);

    if (typeof urlvars.playercolor !== 'undefined'){
      window.playercolor = urlvars.playercolor;
      console.log("Playing with color:" + window.playercolor);
    }

    $('#currentmapname').html(game.map);
    $('#currentgamecreatedate').html(game.created);
    $('#currentgameid').html(game.id);

    //listen to game changes
    var gameRef = getRef('games/' + urlvars.gameid);
    gameRef.on('value', onGameChanged);
  });
}

//drag and drop or click?
function onMouseModeChange (e){
  window.mousemode = $(this).val();
  console.log("Mouse mode set to: " + window.mousemode);
  drawGrid(window.game.grid, window.game.grid); //redraw grid taking into account whether or not to create draggables
}
$('#modeselect').change(onMouseModeChange);
window.mousemode = 'DRAG';
//onMouseModeChange();

});
