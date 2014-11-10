$(document).ready(function(){

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
    document.location.href = 'game.html?gameid=' + game.id;
  });
});

//getting a game
var urlvars = getUrlVars();

Data.getGames(function(games){
  console.log("Games:");
  console.log(games);
  for (gameid in games){
    if (!games.hasOwnProperty(gameid)) continue;
    var game = games[gameid];
    var gameEl = $('<div class="listedgame"><strong>Game '+gameid+'</strong><br /> Created by <strong>'+game.createdby+'</strong> on '+game.created+'<br></div>');

    for (color in game.players){
      if (game.players.hasOwnProperty(color)){
        var colorname = window.colors[color];
          gameEl.append($('<a class="btn btn-default" style="color:'+colorname+'" href="game.html?gameid=' + gameid +'&playercolor='+color+'">Play as '+colorname+' </a> '))
      }
    }
    $('#gameslist').append(gameEl);
  }
});

});
