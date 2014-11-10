$(document).ready(function(){

Data.getGames(function(games){
  console.log("Games:");
  console.log(games);
  $('.listedgame').remove();

  for (gameid in games){
    if (!games.hasOwnProperty(gameid)) continue;
    var game = games[gameid];
    var gameEl = $('<div class="listedgame"><strong>Game '+gameid+' on map '+game.map+'</strong><br /> Created by <strong>'+game.createdby+'</strong> on '+game.created+'<br></div>');

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
