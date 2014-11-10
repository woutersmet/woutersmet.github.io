$(document).ready(function(){

Data.getMaps(function(map){
  console.log("Getting maps");
  console.log(map);
  var listEl = $('<option value="'+map.name+'">' + map.name + '</option>');
  $('#mapselect').append(listEl);
});

$('#creategameform').submit(function(e){
  e.preventDefault();
  if (!confirm("Create a new game?"));
  var mapname = $('#mapselect').val();
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
