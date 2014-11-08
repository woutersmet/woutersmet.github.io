$(document).ready(function(){

window.colors = {
  b : 'blue',
  r : 'red',
  g : 'green',
  y : 'yellow',
}

window.units = {
  s : {
    name : 'soldier',
    type : 'draggable',
    attackbonus : { a : 2},
    price : 100
  },
  t : {
    name : 'tank',
    type : 'draggable',
    attackbonus : { s : 2},
    price : 100
  },
  a : {
    name : 'artillery',
    type : 'draggable',
    attackbonus : { t : 2},
    price : 100
  },
  f : {
    name : 'war factory',
    type : 'building'
  },
  h : {
    name : 'home base',
    type : 'building'
  },
  b : {
    name : 'forest',
    type : 'environment'
  },
  x : {
    name : 'water',
    type : 'environment'
  }

};

 window.buildings = ['f','h','m','q','w'];
 window.draggables = ['t','s','a','c','e','d'];
 window.environmentals = ['b','o','x'];
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
     '4-4' : ['r','h',2],
     '5-5' : ['r','f',5],
     '4-1' : ['e','b',10],
     '5-1' : ['e','b',10],
     '5-2' : ['e','b',10],
 };

 function healthToLevel(health){
     var level;
     if (health >= 10) { level ='f';  }
     else if (health >= 7){ level ='h';}
     else if (health >= 4){ level ='m'; }
     else if (health >= 1){ level ='l'; }
      else {/*death */}
     return level;
 }

function isDraggable(unit){
  return window.draggables.indexOf(unit) > -1;
}

function isBuilding(unit){
 return window.buildings.indexOf(unit) > -1;
}

/*
 window.grid = {
     '1-1' : ['b','h','m'],
     '1-2' : ['b','t','m'],
     '2-4' : ['r','s','m'],
     '1-4' : ['b','t','m'],
     '4-4' : ['r','h','f'],
     '5-5' : ['r','f','f'],
     '5-4' : ['b','t','f'],
 };
 */

 function drawBuildings(){
     for (var i=0;i<buildings.length;i++){
      var unit = buildings[i];
      var src = getUnitPath('b',unit,'f');
      var img = $('<img class="tile menu-tile" src="' + src + '" />');
      img.data('unit', unit);

      img.click(function(e){
          alert("Clicked a " + $(this).data('unit'));
          window.mousemode = {state : 'placingbuilding', 'unit' : unit};
      });

      $('#menu').append(img);
     }
 }

 function getUnitPath(color,unit,healthlevel){
  return 'img/tiles/tile_' + color + '_' + unit + '_'+healthlevel+'h.png';
 }

 function getUnitGraphicPath(unit){
  return 'img/unitgraphics/large_' + unit + '.png';
 }

 function getUnitEl(unitdata){
  var src = getUnitPath(unitdata[0],unitdata[1],healthToLevel(unitdata[2]));
  var unitEl = $('<img class="unit" src="'+src+'">');
  unitEl.data('unit', unitdata[0]);
  unitEl.data('color', unitdata[1]);
  unitEl.data('health', unitdata[2]);
  return unitEl;
 }

 function drawGrid(positions){
  console.log("Redrawing grid...");
  //console.log(window.grid);
     $('#grid').html('');

     positions = positions || {};
     var rows = 5;
     var cols = 5;
     for (var i=1;i<=rows;i++){
        var row = $('<tr class="grid-row"></tr>');
        for (var j=1;j<=cols;j++){
          var cell = $('<td class="grid-cell" id="cell_'+i+'_'+j+'"></td>');
          cell.data('x', i);
          cell.data('y', j);

          var key = i + '-' + j;
          if (typeof positions[key] != 'undefined'){
            //console.log("Found a unit at "+key+"!");
             var unitdata = positions[key];
             //console.log(unitdata);
             var unitEl = getUnitEl(unitdata);

            if (window.playercolor == unitdata[0]){
              unitEl.addClass('user-unit');
               if (isDraggable(unitdata[1])){
                unitEl.draggable();
              }

            }

             //console.log(unitEl);
             cell.append(unitEl);
             cell.data('unit', unitdata);
          }

          row.append(cell);
        }
        $('#grid').append(row);
     }
 }

 function doActiveUnitStuff(location,building){
  console.log("Clicked a building at "+location+"! building: " + building);

  $('#activeunit-name').html(window.units[building[1]].name);
  $('#activeunit-name').css('color', window.colors[building[0]]);
  $('#activeunit-graphic').attr('src',getUnitGraphicPath(building[1]));

 }

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

 function removeExplosions(){
    $('.explosion').remove();
 }

 function explode(locationKey){
     console.log("Drawing explosion at location " + locationKey);
     var coords = keyToCoords(locationKey);
     var src = 'img/explosion.gif';
    var explosionEl = $('<img class="explosion" src="' + src +'" />' );
    explosionEl.css({
      'top' : ((coords[0] - 1) * 30) + 'px',
      'left' : ((coords[1] - 1)* 30) + 'px',
    });
    console.log(explosionEl);
    $('#gridcontainer').prepend(explosionEl);

    setTimeout(removeExplosions,800);
 }

 function coordsToKey(row,col) {
  return row +'-' + col;
 }

 function keyToCoords(key){
  return key.split('-');
 }

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

/* chat stuff */
  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

   function drawUser(username, x, y){

   }

   window.roomname = 'room_' + (getUrlVars()['room'] || 'anonymous');
   window.username = getUrlVars()['username'] || 'anonymous';
   $('#roomname').html(roomname);

   window.drewShips = {};

  // CREATE A REFERENCE TO FIREBASE
  var mousemoveRef = new Firebase('https://woutertest.firebaseio.com/mousemove');
  var roomRef = new Firebase('https://woutertest.firebaseio.com/mousemove/' + roomname);

  // LISTEN FOR MOUSE EVENT
  $(document).mousemove(function(e){
    var x = e.pageX;
    var y = e.pageY;
    $('#mouseX').html(x);
    $('#mouseY').html(y);

    mousemoveRef.child(roomname).child('user_' + window.username).set({x:x, y:y});
  });

  //listen for people moving
  roomRef.on('value', function (snapshot) {
    var state = snapshot.val();
    //console.log(state);

    $('#users').html('');
    for (var user in state){
      if (!state.hasOwnProperty(user)) continue;
      $('#users').html($('#users').html() + user + ' moved to '+ state[user].x + ',' + state[user].y +'<br>');

      //console.log(user);
      //console.log(state[user]);
      //console.log(typeof(window.drewShips[user]));

      if (typeof(window.drewShips[user]) == 'undefined'){
          var shipEl = $('<div id="usership_'+user+'" class="usership"><span id="usership_username">'+user.substr(5)+'</span></div>');
          //$('#container').append(shipEl);
          console.log('New ship: ' + user);
          window.drewShips[user] = true;
      }

      var $ship = $('#usership_' + user);
      //console.log(state.y +'px');
      //$ship.css({'top' : (state[user].y + 5) + 'px', 'left' : (state[user].x + 5) + 'px'});
    }

  });


});
