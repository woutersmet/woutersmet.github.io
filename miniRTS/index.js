$(document).ready(function(){

Data.getGames(function(games){
  console.log("Games:");
  console.log(games);
  $('.listedgame').remove();

  if (games == null){
    console.log("No games it seems!");
    $('#nogamesfound').show();
  }
  else {
    $('#nogamesfound').hide();
    for (gameid in games){
      if (!games.hasOwnProperty(gameid)) continue;
      var game = games[gameid];
      var gameEl = $('<div class="listedgame"><strong>Game '+gameid+' on map '+game.map+'</strong><br /> Created by <strong>'+game.createdby+'</strong> on '+game.created+'<br></div>');

      for (color in game.players){
        if (game.players.hasOwnProperty(color)){
          var colorname = window.colors[color];
          var player = game.players[color];
          if (!player.name){
            gameEl.append($('<a class="btn btn-default" style="color:'+colorname+'" href="game.html?gameid=' + gameid +'&playercolor='+color+'">Join game as '+colorname+' </a> '))
          }
          else {
            gameEl.append($('<span style="color:'+colorname+'"><strong>'+player.name+'</strong> is playing as '+colorname+' </span> '))
          }
        }
      }
      $('#gameslist').append(gameEl);
    }
  }
});

});
