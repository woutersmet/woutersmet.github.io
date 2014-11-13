
function debug(smt){
  console.log(smt);
}

window.colors = {b : 'blue',r : 'red',g : 'green',y : 'yellow'};
window.startmoney = 1000;
window.units = {
  s : {name : 'soldier',    type : 'draggable', speed : 1, range : 2, attackbonus : { a : 3},    price : 100},
  t : {name : 'tank',       type : 'draggable', speed : 2, range : 2, attackbonus : { s : 2},    price : 150},
  a : {name : 'artillery',  type : 'draggable', speed : 2, range : 3, attackbonus : { t : 2, f : 2, h : 1},    price : 200},
  v : {name : 'attack dog', type : 'draggable', speed : 1, range : 3, attackbonus : { t : 2},    price : 200},
  i : {name : 'engineer',   type : 'draggable', speed : 1, range : 1, attackbonus : { t : 2},    price : 250},
  u : {name : 'war ship',   type : 'draggable', speed : 2, range : 2, attackbonus : { t : 2},    price : 300},
  j : {name : 'submarine',  type : 'draggable', speed : 2, range : 2, attackbonus : { t : 2},    price : 250},

  f : {name : 'war factory',    type : 'building', range : 3, price : 700},
  h : {name : 'home base',    type : 'building', range : 3, price : 700},
  p : {name : 'sea base',    type : 'building', range : 3, price : 700},
  q : {name : 'research center',    type : 'building', range : 3, price : 700},

  b : {name : 'forest',    type : 'environment' },
  x : {name : 'water',type : 'environment'},
  o : {name : 'ore mine',type : 'environment'},
  z : {name : 'fog of war',type : 'environment'},
};

 window.buildings = ['f','h','m','q','w'];
 window.draggables = ['t','s','a','c','e','d'];
 window.environmentals = ['b','o','x'];

 window.reachedCache = {};

 function cellWithinReach(grid,fromrow,fromcol,torow,tocol,range){
  debug("is cell " + torow +','+ tocol + ' in reach from ' + fromrow + ',' + fromcol +'?');
  var reached = getReachedCells(grid,fromrow,fromcol,range);
  var found = false;
  for (var i=0;i<reached.length;i++){
    if (reached[i][0] == torow && reached[i][1] == tocol){
      found = true;
      break;
    }
  }

  if (found){
    debug("Reached!");
    return true;
  }
  else {
    debug("Not reached!");
    return false;
  }
 }

 function getVisibleTiles(grid){
  var visible = [];
  for (cell in grid.cells){
    if (grid.cells.hasOwnProperty(cell)){
      var unitdata = grid.cells[cell];
      if (unitdata[0] !== window.playercolor) continue;
      var range = window.units[unitdata[1]].range;
      var coords = keyToCoords(cell);
      var reached = getReachedCells(grid,coords[0],coords[1],range);

      for (var i =0;i<reached.length;i++){
        visible[coordsToKey(reached[i][0],reached[i][1])] = true;
      }
    }
  }
    debug("Visible tiles:");
    debug(visible);
    return visible;
 }

 function getReachedCells(grid,row,col,range){
    var cacheKey = row + '-' + col + '-' + range;
    debug("Getting reached cells for " + cacheKey);

    var reached = [];
    if (typeof window.reachedCache[cacheKey] != 'undefined') {
      debug("Found " + cacheKey + " in cache!");
      reached = window.reachedCache[cacheKey];
    }
    else {
      range = parseInt(range,10);
      row = parseInt(row,10);
      col = parseInt(col,10);
      for (var rowToCheck=row-range, i=0;rowToCheck<=row+range;rowToCheck++,i++){
        //row within grid?
        if (rowToCheck<=0) continue;
        if (rowToCheck>grid.rows) continue;

        for (var colToCheck=col-range,j=0;colToCheck<=col+range;colToCheck++,j++){
          //col within grid?
          if (colToCheck<=0) continue;
          if (colToCheck>grid.cols) continue;

          //exclude 'corners' if range bigger than 1
          if (range > 1){
            if (i == 0 && j==0) continue;
            if (i == 0 && j==2*range) continue;
            if (i ==  2*range && j==0) continue;
            if (i == 2*range && j==2*range ) continue;
          }
          reached.push([rowToCheck,colToCheck]);
        }
      }

      window.reachedCache[cacheKey] = reached;
    }

    debug("Got these reached cells for range " + range + " from col " + col + " and row " + row);
    debug(reached);
    return reached;
 }

 //whwere to put new units?
 function whereToPutUnit(buildingPos){
  var coords = keyToCoords(buildingPos);
    var buildingRow = coords[0];
    var buildingCol = coords[1];

    var row =1,col=buildingRow;
    //upper or lower half?
    if (buildingRow < window.game.grid.rows / 2){
        row = buildingRow+1;
    }
    else {
        row = buildingRow-1;
    }

    //upper or lower half?
    var increment = buildingCol < window.game.grid.cols / 2 ? 1 : -1;
    for (var i=0;i<12;i++){
      if (typeof window.game.grid.cells[coordsToKey(row,col+increment*i)] == 'undefined'){
        col+=i;
        break;
      }
    }

    return coordsToKey(row,col);
 }

 function onShopElClicked(e){
  e.preventDefault();
  var currentmoney = window.game.players[window.playercolor].money;
  var unit = $(this).data('unit');
  var unitprice = window.units[unit].price;
  debug("Shop el clicked! " + unit);

  if (unitprice > currentmoney) {
    alert("Sorry, this unit costs " + unitprice + "$ which you don't have.");
    return;
  }

  debug(window.draggingfrom);
  var unitdata = [window.playercolor,unit,10];
  //where to place el?
  var destination = whereToPutUnit(window.draggingfrom);
  window.game.grid.cells[destination] = unitdata;
  window.game.players[window.playercolor].money -= unitprice;
  Data.updateGame(window.game.id,window.game);
 }

function drawShops(){
  debug("Drawing shops");
  for (unit in window.units){
    if (window.units.hasOwnProperty(unit)){
      var unitdata = window.units[unit];
      var shopEl = $('<a href="#" class="shopunit"></a>');
      shopEl.append($('<img src="img/unitgraphics/tiny_'+unit+'.png" />'));
      shopEl.append($('<span>'+unitdata.name+'<br />'+unitdata.price+'$</span>'));
      shopEl.data('unit',unit);
      shopEl.click(onShopElClicked);
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
    //debug("Drawing " + speedOrRange + " circle at position "+row+","+col+" of value " + value);

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
  debug("Drawing circles for at location "+row+','+col+" for unit " + clickedUnit + " which has speed "+ speed + ' and range ' + range);

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
    //debug(cos);
    debug('page coords '+pageX+','+pageY+' on ' + pxX + ',' + pxY + ' within grid, giving cell: ' + cellX + ',' + cellY);
    var location = cellX +'-' + cellY;
    return location;
 }

 function drawGrid(el, grid, prevpositions, fog){
  debug("Redrawing grid... ");
  debug(grid);

  var fog = fog || false;

     $(el).html('');

     var visible;
     if (fog){
      visible = getVisibleTiles(grid);
     }

     positions = grid.cells;
     for (var i=1;i<=grid.rows;i++){
        var row = $('<tr class="grid-row"></tr>');
        for (var j=1;j<=grid.cols;j++){
          var cell = $('<td class="grid-cell" id="cell_'+i+'_'+j+'"></td>');
          cell.data('row', i);
          cell.data('col', j);

          var key = coordsToKey(i,j);
             if (fog && visible[key] !== true){
                 var unitEl = getUnitEl(['e','z',10]);
                 cell.append(unitEl);
             }
             else {
              if (typeof positions[key] != 'undefined'){
                //debug("Found a unit at "+key+"!");
                 var unitdata = positions[key];
                 //debug(unitdata);
                 var unitEl = getUnitEl(unitdata);

                if (window.playercolor == unitdata[0]){
                  unitEl.addClass('user-unit');
                   if (window.mousemode == 'DRAG' && isDraggable(unitdata[1])){
                    unitEl.draggable();
                  }
                }

                 //debug(unitEl);
                 cell.append(unitEl);
                 cell.data('unit', unitdata);

                 //explosion?
                 if (typeof(prevpositions) != 'undefined' && typeof(prevpositions.cells[key]) != 'undefined' && prevpositions.cells[key][2] > unitdata[2]){
                  debug("Explosion at " + key);
                  explode(key);
                 }
              }
            }

          row.append(cell);
        }
        $(el).append(row);
     }
 }

 function doActiveUnitStuff(location,building){
  debug("Clicked a unit at "+location+"! unit: " + building);

  $('#activeunit-name').html(window.units[building[1]].name);
  $('#activeunit-name').css('color', window.colors[building[0]]);
  $('#activeunit-graphic').attr('src',getUnitGraphicPath(building[1]));


  if (building[1] == 'f'){
    debug("War factory! Showing unit shop");
    $('#shop-draggables').show();
  }
  else {
    $('#shop-draggables').hide();
  }

  /*
  if (building[1] == 'h'){
    debug("Home base! Showing building shop");
    $('#shop-buildings').show();
  }
  else {
    $('#shop-buildings').hide();
  }
  */
 }

 function removeExplosions(){
    $('.explosion').remove();
 }

 function explode(locationKey){
     debug("Drawing explosion at location " + locationKey);
     var coords = keyToCoords(locationKey);
     var src = 'img/explosion.gif';
    var explosionEl = $('<img class="explosion" src="' + src +'" />' );
    explosionEl.css({
      'top' : ((coords[0] - 1) * 30) + 'px',
      'left' : ((coords[1] - 1)* 30) + 'px',
    });
    debug(explosionEl);
    $('#gridcontainer').prepend(explosionEl);

    setTimeout(removeExplosions,800);
 }

 function coordsToKey(row,col) {
  return row +'-' + col;
 }

 function keyToCoords(key){
  var split = key.split('-');
  return [parseInt(split[0],10),parseInt(split[1],10)];
 }

function getUserName() {
  debug("Getting username...");
  var username = $.cookie('username');
  debug("From cookie: " + username);

  if (typeof username == 'undefined'){
    var islocal = document.URL.search('local') > - 1;
    if (islocal) { //stupid chrome no local cookie stuff :(
      username = 'Local tester ' + makeId(5);
    }
    else {
      username = prompt("Pick a username?");
      $.cookie('username',username);
    }
  }

  return username;
}

  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
