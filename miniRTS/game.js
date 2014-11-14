$(document).ready(function(){

 $(document).on('mousedown',function(e){

    var locationClicked = mouseCoordsToGridLocation(e.pageX,e.pageY);
    var coords = keyToCoords(locationClicked);
    var row = coords[0];
    var col = coords[1];
    //debug("Clicked grid coordinates " + row + "," + col);
    var clickedUnit = window.game.grid.cells[locationClicked];

    if (window.draggingunit && window.mousemode == 'CLICK'){ //in click (mobile) mode, this can move a unit!
        debug("in click mode, moving a unit, and clicked an empty cell! Moving");
        var to = coordsToKey(row,col);
        moveUnit(window.draggingunit,window.draggingfrom,locationClicked);
        window.draggingunit = false;
      }
      else {
        if (typeof clickedUnit != 'undefined'){
          doActiveUnitStuff(window.draggingfrom,clickedUnit);

          window.draggingfrom = locationClicked;

          if (window.playercolor == clickedUnit[0]){ //clicked draggable!
            if (isBuilding(clickedUnit[1])){
              console.log("Clicked building!");
            }
            else {
              window.draggingunit = clickedUnit;
              debug ("Dragging unit:" + clickedUnit);

              //range circles?
              drawCircles(row,col,clickedUnit);
            }
          }
        }
        else {
          window.draggingunit = false;
        }
      }
 });

 function moveUnit(unit,from,to){
    debug("Moving unit ["+unit+"] from " + from + " to " + to);

    //deep copy, assure window.game isnt changed by our changes, just pushing to server  - see http://stackoverflow.com/questions/5364650/cloning-an-object-in-javascript
    var newgamestate = $.extend(true, {}, window.game);
    var gridchanged = false;
    var fromcoords = keyToCoords(from);
    var tocoords = keyToCoords(to);

    //regular move
    if (to == from) {
      //no movement!
    }
    else if (typeof newgamestate.grid.cells[to] == 'undefined'){ //good to move unit
      var withinMoveReach = cellWithinReach(newgamestate.grid,fromcoords[0],fromcoords[1],tocoords[0],tocoords[1],window.units[unit[1]].speed);
      if (!withinMoveReach){
        debug("Tried to move unit out of its reach!");
      }
      else {
        delete(newgamestate.grid.cells[from]);
        newgamestate.grid.cells[to] = unit;
        gridchanged = true;
      }
    }
    else if (newgamestate.grid.cells[to][0] == 'e'){ //environment! cannot move there
        debug("Dragging to environment! No movement allowed - just redraw grid");
    }
    else {
      //attack! can be on own units. Check if within range?
      var withinAttackReach = cellWithinReach(newgamestate.grid,fromcoords[0],fromcoords[1],tocoords[0],tocoords[1],window.units[unit[1]].range);
      if (!withinAttackReach){
        debug("Tried to attack a unit out of its reach!");
      }
      else {
        var attackedunit = newgamestate.grid.cells[to];
        var bonus = window.units[unit[1]].attackbonus[attackedunit[1]];
        if (typeof bonus == 'undefined') bonus = 0;
        attackedunit[2] = attackedunit[2] - 1 - bonus;

        if (attackedunit[2] <= 0) { //unit death!
          delete(newgamestate.grid.cells[to]);
        }
        else {
          newgamestate.grid.cells[to] = attackedunit;
        }
        debug("Attack! Location " + to + " now has unit: " + attackedunit);
        gridchanged = true;
      }
    }

    debug(newgamestate);

    //either redraw remotely (update) if grid changed, or locally if it didn't
    if (gridchanged){
      Data.updateGame(newgamestate.id,newgamestate);
    }
    else {
      drawGrid($('#grid'),newgamestate.grid,newgamestate.grid,window.game.fogofwar);
    }
    removeCircles();
 }

//used to be grid, but then circle elements hinder mouseup detection
 $(document).mouseup(function(e){
  if (window.mousemode == 'CLICK') return; //here it all happens on mousedown

    var dest = mouseCoordsToGridLocation(e.pageX,e.pageY);

    if (window.draggingunit){
        debug("Mouse mode drag, so mouse up is when to move unit!");
        moveUnit(window.draggingunit,window.draggingfrom,dest);
        window.draggingunit = false;
      }
 });

//getting a game
var urlvars = getUrlVars();

 //window.playercolor = 'b';
 //window.game.mousemode = {state : 'nothing'};

function drawPlayers(players,usercolor){
  debug("drawing players...");
  debug(players);
  $('.inviteplayer').hide();
  for (color in players){
    if (players.hasOwnProperty(color)){
      var name = players[color].name;
      $('#playercontainer-'+color).show();
      debug("Updating player " + color + ' with name '+ name);
      var playerEl = $('#player-' + color);

      var inviteEl = $('#inviteplayer-'+color);
      var joinEl = $('#joinasplayer-'+color);

      if (name){
        $('#playermoney-' + color).html(players[color].money +'$');
        playerEl.html(name);
        if (color == usercolor) playerEl.addClass('player-active');
        //online?
        if (players[color].status == 'online'){
          playerEl.append($('<span class="online">online</span>'));
        }
        else {
          playerEl.append($('<span class="offline">offline</span>'));
        }
      }
      else {
        debug(color + " is an empty slot!");
        var name = '[Waiting for player]';
        playerEl.show().html(name);
        var invitelink = 'game.html?gameid=' + window.game.id + '&playercolor=' + color;
        joinEl.attr('href', invitelink);
        inviteEl.click(function(e){
          e.preventDefault();
          prompt("Copy-paste this link to invite " + window.colors[color] + ' player:',invitelink);
        });
        inviteEl.show();
      }
    }
  }
}

function checkForWinner(grid,players){
  //which colors are present?
  var colorsInGrid = [];
  for (key in grid.cells){
     var color = grid.cells[key][0];
     debug("colorsInGrid index: " + colorsInGrid.indexOf(colorsInGrid));
     if (color != 'e' && colorsInGrid.indexOf(color) == -1) colorsInGrid.push(color);
  }

  debug("Grid contains colors:" + colorsInGrid);
  for (color in players){
      if (colorsInGrid.indexOf(color) == -1){
        //check if each player represented on grid?
      }
  }

  return false;
}

function onGameChanged (snapshot) {
  debug("Game changed!");
  var newgame = snapshot.val();
  if (typeof (window.game) == 'undefined') window.game = newgame;

  //grid
  drawGrid($('#grid'),newgame.grid, window.game.grid, (window.game.fogofwar && window.playercolor));
  window.game = newgame;

  //players
  drawPlayers(newgame.players, window.playercolor);
}

if (typeof(urlvars.gameid) !== 'undefined'){
  debug("We're in a game!");
  Data.getGame(urlvars.gameid,function(game){
    debug("Game loaded:");
    debug(game);
    if (game == null) {
      alert("Didn't find a valid game for id " + urlvars.gameid);
      document.location.href= 'index.html';
      return;
    }

    var username = getUserName();

    //this should be validated more
    if (['b','r','g','y'].indexOf(urlvars.playercolor) > -1){
      window.playercolor = urlvars.playercolor;
      debug("Playing with color:" + window.playercolor);
      game.players[window.playercolor] = {name : username, money : window.startmoney};

      Data.updateGame(game.id,game);

      doPresenceStuff(urlvars.gameid,window.playercolor);
    }
    else {
      alert("Joining game as spectator");
    }

    $('#currentmapname').html(game.map);
    $('#currentgamecreatedate').html(game.created);
    $('#currentgameid').html(game.id);

    $('#gamecontainer').show();
    $('#loading').hide();

    //draw shop
    drawShops();

    //listen to game changes
    var gameRef = getRef('games/' + urlvars.gameid);
    gameRef.on('value', onGameChanged);
  });
}

//drag and drop or click?
function onMouseModeChange (e){
  window.mousemode = $(this).val();
  debug("Mouse mode set to: " + window.mousemode);
  drawGrid($('#grid'),window.game.grid, window.game.grid, window.game.fogofwar); //redraw grid taking into account whether or not to create draggables
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

//idle?

});
