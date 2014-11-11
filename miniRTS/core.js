
window.colors = {b : 'blue',r : 'red',g : 'green',y : 'yellow'};

window.units = {
  s : {name : 'soldier',    type : 'draggable', speed : 1, range : 2, attackbonus : { a : 2},    price : 100},
  t : {name : 'tank',       type : 'draggable', speed : 2, range : 2, attackbonus : { s : 2},    price : 100},
  a : {name : 'artillery',  type : 'draggable', speed : 2, range : 3, attackbonus : { t : 2},    price : 100},
  v : {name : 'attack dog', type : 'draggable', speed : 1, range : 3, attackbonus : { t : 2},    price : 100},
  i : {name : 'engineer',   type : 'draggable', speed : 1, range : 1, attackbonus : { t : 2},    price : 100},
  u : {name : 'war ship',   type : 'draggable', speed : 2, range : 2, attackbonus : { t : 2},    price : 100},
  j : {name : 'submarine',  type : 'draggable', speed : 2, range : 2, attackbonus : { t : 2},    price : 100},

  f : {name : 'war factory',    type : 'building'},
  h : {name : 'home base',    type : 'building'},
  p : {name : 'sea base',    type : 'building'},
  q : {name : 'research center',    type : 'building'},

  b : {name : 'forest',    type : 'environment' },
  x : {name : 'water',type : 'environment'},
  o : {name : 'ore mine',type : 'environment'},
  z : {name : 'fog of war',type : 'environment'},
};

 window.buildings = ['f','h','m','q','w'];
 window.draggables = ['t','s','a','c','e','d'];
 window.environmentals = ['b','o','x'];

function drawShops(){
  console.log("Drawing shops");
  for (unit in window.units){
    if (window.units.hasOwnProperty(unit)){
      var unitdata = window.units[unit];
      var shopEl = $('<a class="shopunit">'+unitdata.name+'<br />'+unitdata.price+'$</a>');
      if (unitdata.type == 'draggable'){
        $('#shop-draggables').append(shopEl);
      }
      else if (unitdata.type == 'building'){
        $('#shop-buildings').append(shopEl);
      }
    }
  }
}

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

 function drawCircleAtPosition(speedOrRange,row,col,value){
    console.log("Drawing " + speedOrRange + " circle at position "+row+","+col+" of value " + value);

    var el = $('#circle-'+speedOrRange+'-'+value);
    var shift = 30 * value;
    var top = (row-1)*30 - shift;
    var left = (col-1)*30 - shift;
    var positionCss = {top : top+'px',left : left+'px'};

    el.css(positionCss).show();
 }

 function drawCircles(row,col,clickedUnit){
  var specs = window.units[clickedUnit[1]];
  var speed = specs.speed;
  var range = specs.range;
  console.log("Drawing circles for at location "+row+','+col+" for unit " + clickedUnit + " which has speed "+ speed + ' and range ' + range);

  drawCircleAtPosition('speed', row,col,speed);
  drawCircleAtPosition('range', row,col,range);
 }

 function removeCircles(){
  $('.unitcircle').hide();
 }

 function mouseCoordsToGridLocation(pageX,pageY){
    var gridsize = 30;
    var cos = $('#grid').offset();
    var pxX = pageX - cos.left;
    var pxY = pageY - cos.top;
    var cellY = 1 + Math.floor(pxX/30);
    var cellX = 1 + Math.floor(pxY/30);
    //console.log(cos);
    console.log('page coords '+pageX+','+pageY+' on ' + pxX + ',' + pxY + ' within grid, giving cell: ' + cellX + ',' + cellY);
    var location = cellX +'-' + cellY;
    return location;
 }

 function drawGrid(el, grid, prevpositions){
  console.log("Redrawing grid... ");
  console.log(grid);
     $(el).html('');

     positions = grid.cells;
     for (var i=1;i<=grid.rows;i++){
        var row = $('<tr class="grid-row"></tr>');
        for (var j=1;j<=grid.cols;j++){
          var cell = $('<td class="grid-cell" id="cell_'+i+'_'+j+'"></td>');
          cell.data('row', i);
          cell.data('col', j);

          var key = coordsToKey(i,j);
          if (typeof positions[key] != 'undefined'){
            //console.log("Found a unit at "+key+"!");
             var unitdata = positions[key];
             //console.log(unitdata);
             var unitEl = getUnitEl(unitdata);

            if (window.playercolor == unitdata[0]){
              unitEl.addClass('user-unit');
               if (window.mousemode == 'DRAG' && isDraggable(unitdata[1])){
                unitEl.draggable();
              }
            }

             //console.log(unitEl);
             cell.append(unitEl);
             cell.data('unit', unitdata);

             //explosion?
             if (typeof(prevpositions) != 'undefined' && typeof(prevpositions.cells[key]) != 'undefined' && prevpositions.cells[key][2] > unitdata[2]){
              console.log("Explosion at " + key);
              explode(key);
             }
          }

          row.append(cell);
        }
        $(el).append(row);
     }
 }

 function doActiveUnitStuff(location,building){
  console.log("Clicked a unit at "+location+"! unit: " + building);

  $('#activeunit-name').html(window.units[building[1]].name);
  $('#activeunit-name').css('color', window.colors[building[0]]);
  $('#activeunit-graphic').attr('src',getUnitGraphicPath(building[1]));

  if (building[1] == 'f'){
    console.log("War factory! Showing unit shop");
    $('#shop-draggables').show();
  }
  else {
    $('#shop-draggables').hide();
  }
  if (building[1] == 'h'){
    console.log("Home base! Showing building shop");
    $('#shop-buildings').show();
  }
  else {
    $('#shop-buildings').hide();
  }
 }

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
