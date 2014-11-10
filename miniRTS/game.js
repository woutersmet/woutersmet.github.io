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

            //range circles?
            drawCircles(row,col,clickedUnit);
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
   removeCircles();
   //drawGrid(window.game.grid);
 }

//used to be grid, but then circle elements hinder mouseup detection
 $(document).mouseup(function(e){
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

//getting a game
var urlvars = getUrlVars();

 window.playercolor = 'b';
 //window.game.mousemode = {state : 'nothing'};

function drawPlayers(players,usercolor){
  console.log("drawing players...");
  console.log(players);
  $('.inviteplayer').hide();
  for (color in players){
    if (players.hasOwnProperty(color)){
      var name = players[color].name;
      var playerEl = $('#player-' + color);
      if (name){
        console.log("Updating player " + color + ' with name '+ name);
        playerEl.show().html(name);
        if (color == usercolor) playerEl.addClass('player-active');
      }
      else {
        console.log(color + " is an empty slot!");
        var name = '[Waiting for player]';
        playerEl.show().html(name);
        $('#inviteplayer-'+color).show();
      }
    }
  }
}

function onGameChanged (snapshot) {
  console.log("Game changed!");
  var newgame = snapshot.val();
  if (typeof (window.game) == 'undefined') window.game = newgame;

  //grid
  drawGrid(newgame.grid, window.game.grid);
  window.game = newgame;

  //players
  drawPlayers(newgame.players, window.playercolor);
}

function getUserName() {
  console.log("Getting username...");
  var username = $.cookie('username');
  console.log("From cookie: " + username);

  if (typeof username == 'undefined'){
    username = prompt("Pick a username?");
    $.cookie('username',username);
  }

  return username;
}

if (typeof(urlvars.gameid) !== 'undefined'){
  console.log("We're in a game!");
  Data.getGame(urlvars.gameid,function(game){
    console.log("Game loaded:");
    console.log(game);
    if (game == null) {
      alert("Didn't find a valid game for id " + urlvars.gameid);
      return;
    }

    var username = getUserName();

    //this should be validated more
    if (typeof urlvars.playercolor !== 'undefined'){
      window.playercolor = urlvars.playercolor;
      console.log("Playing with color:" + window.playercolor);
      game.players[window.playercolor] = {name : username, money : 100};
      Data.updateGame(game.id,game);
    }

    $('#currentmapname').html(game.map);
    $('#currentgamecreatedate').html(game.created);
    $('#currentgameid').html(game.id);

    $('#gamecontainer').show();
    $('#loading').hide();

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

//on mobile?
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 window.mousemode = 'CLICK';
}
else {
  window.mousemode = 'DRAG';
}
$('#modeselect').val(window.mousemode);
//onMouseModeChange();

});
