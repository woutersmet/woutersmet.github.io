$(document).ready(function(){

Data.getMaps(function(map){
  console.log("Getting maps");
  console.log(map);
  var listEl = $('<option value="'+map.name+'">' + map.name + '</option>');
  $('#mapselect').append(listEl);

  var selectEl = $('<div class="listedmap"><label><input type="radio" name="mapname" value="'+map.name+'">' + map.name + '</label></div>');
  var gridEl = $('<div class="grid" id="grid-' + map.name + '"></div>');
  selectEl.append(gridEl);
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
  var playername = 'testuser';
  Data.createGame(mapname, playername, function(game){
    console.log("Game created! Navigate to it?");
    console.log("Game id: " + game.id);
    alert("Game created! It will show up in the games list where you can join as the color you choose");
    document.location.href = 'game.html?gameid=' + game.id + '&playercolor='+color;
  });
});

});
