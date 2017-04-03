$(document).ready(function(){

Data.getMaps(function(map){
  console.log("Getting maps");
  console.log(map);
  var listEl = $('<option value="'+map.name+'">' + map.name + '</option>');
  $('#mapselect').append(listEl);

  var selectEl = $('<label class="clearfix listedmap"><h4><input type="radio" name="mapname" value="'+map.name+'">' + map.name + '</h4></label>');
  var gridEl = $('<div class="grid" id="grid-' + map.name + '"></div>');
  var descriptionEl = $('<div class="description">'+(typeof map.description == 'undefined' ? '(no description)' : map.description) + '</div><div style="clear:both;></div>');
  selectEl.append(gridEl);
  selectEl.append(descriptionEl);
  //draw grid
  drawGrid(gridEl,map.grid);
  $('#maplist').append(selectEl);
});

$('#creategameform').submit(function(e){
  e.preventDefault();
  if (!confirm("Create a new game?"));

  //var mapname = $('#mapselect').val();
  var mapname = $('input[name=mapname]:checked', '#creategameform').val();

  var color = $('#colorselect').val();
  var playername = getUserName();
  Data.createGame(mapname, playername, function(game){
    console.log("Game created! Navigate to it?");
    console.log("Game id: " + game.id);
    alert("Game created - joining as " +window.colors[color]+ "!");
    document.location.href = 'game.html?gameid=' + game.id + '&playercolor='+color;
  });
});

});
