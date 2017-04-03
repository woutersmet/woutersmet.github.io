//firebase stuff

var Data = {};

Data.baseUrl = 'https://woutertest.firebaseio.com/miniRTS/';

function doPresenceStuff(gameid,usercolor){
  debug("Doing presence stuff...");

  //online presence stuff?
  //source: https://www.firebase.com/blog/2013-06-17-howto-build-a-presence-system.html
  var amOnline = new Firebase('https://woutertest.firebaseio.com/.info/connected'); //new Firebase('https://<demo>.firebaseio.com/.info/connected');
  var userStatusRef = getRef('games/'+gameid+'/players/'+usercolor + '/status'); //new Firebase('https://<demo>.firebaseio.com/presence/' + userid);
  amOnline.on('value', function(snapshot) {
    if (snapshot.val()) {
      userStatusRef.onDisconnect().set('offline');
      userStatusRef.set('online');
    }
  });
}

function makeId(length)
{
    var length = length || 5;
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function getRef(section){
  var ref = new Firebase(Data.baseUrl + section);
  return ref;
}

Data.saveMap = function (mapname, mapdescription, createdby, grid, callback){
  debug("Will save map with name " + mapname);
  // CREATE A REFERENCE TO FIREBASE
  var mapRef = getRef('maps');

  //which colors are present?
  var colors = [];
  for (key in grid.cells){
     var color = grid.cells[key][0];
     debug("Colors index: " + colors.indexOf(colors));
     if (color != 'e' && colors.indexOf(color) == -1) colors.push(color);
  }
  debug("Map contains colors:" + colors);

  var values = {
    name : mapname,
    description : mapdescription,
    createdby : createdby,
    grid : grid,
    colors : colors
  };

  mapRef.child(mapname).set(values);

  callback();
}

Data.getMaps = function(callback){
  var mapRef = getRef('maps');

  mapRef.on('child_added', function(snapshot) {
        var map = snapshot.val();
        callback(map);
      });
}

//see https://www.firebase.com/docs/web/guide/retrieving-data.html
Data.getGames = function (callback){
    debug("Getting Games");

    var ref = getRef('games');
    debug(ref);
    debug(ref.orderByChild);
    ref.orderByChild("createdtime").limitToLast(2).on("value", function(data) {
      var games = data.val();
      debug("Loaded games:");
      debug(games);
      callback(games);
  });
}

//see https://www.firebase.com/docs/web/guide/retrieving-data.html
Data.getMap = function (mapname, callback){
  debug("Getting map with name " + mapname);
    var ref = getRef('maps/' + mapname);

    ref.once("value", function(data) {
      var map = data.val();
      debug("Loaded map:");
      debug(map);
      callback(map);
  });
}

Data.createGame = function(mapname, playername, callback){
  debug("Creating game with map " + mapname);

  Data.getMap(mapname,function(map){
    debug("Got our map! Now we can init game with it");
    debug(map);
    var id = makeId();
    var date = new Date();
    var game = {
      id : id,
      created : date.toString(),
      createdtime : Math.floor(date.getTime() / 1000),
      createddate : date.getYear() + '-' + date.getDate() + '-' + date.getDay(),
      status : 'paused',
      map : mapname,
      log : [
        {
          type : 'game_created',
          byuser : playername,
          timestamp : Firebase.ServerValue.TIMESTAMP
        }
      ],
      createdby : playername,
      grid : map.grid,
      fogofwar : true,
      players : {}
    }

    for (var i=0;i<map.colors.length;i++){
      game.players[map.colors[i]] = {name : false, money : window.startmoney, status : 'offline'};
    }

    var ref = getRef('games/' + id);
    ref.set(game);
    callback(game);
  })
}

Data.updateGame = function (gameid, newgame){
  debug("Updating game grid for game " + gameid);
  var ref = getRef('games/' + gameid);
  ref.set(newgame);
}

Data.getGame = function (gameid, callback){
  debug("Getting game with id " + gameid);
  var ref = getRef('games/' + gameid);

    ref.once("value", function(data) {
      var game = data.val();
      debug("Loaded game:");
      debug(game);
      callback(game);
  });
}
