//firebase stuff

var Data = {};

Data.baseUrl = 'https://woutertest.firebaseio.com/miniRTS/';

function doPresenceStuff(gameid,usercolor){
  console.log("Doing presence stuff...");

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
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function getRef(section){
  var ref = new Firebase(Data.baseUrl + section);
  return ref;
}

Data.saveMap = function (mapname, createdby, grid){
  console.log("Will save map with name " + mapname);
  // CREATE A REFERENCE TO FIREBASE
  var mapRef = getRef('maps');

  //which colors are present?
  var colors = [];
  for (key in grid.cells){
     var color = grid.cells[key][0];
     console.log("Colors index: " + colors.indexOf(colors));
     if (color != 'e' && colors.indexOf(color) == -1) colors.push(color);
  }
  console.log("Map contains colors:" + colors);

  var values = {
    grid : grid,
    createdby : createdby,
    name : mapname,
    colors : colors
  };

  mapRef.child(mapname).set(values);
}

Data.getMaps = function(callback){
  mapRef = getRef('maps');

  mapRef.on('child_added', function(snapshot) {
        var map = snapshot.val();
        callback(map);
      });
}

//see https://www.firebase.com/docs/web/guide/retrieving-data.html
Data.getGames = function (callback){
  console.log("Getting Games");
    var ref = getRef('games/');

    ref.on("value", function(data) {
      var games = data.val();
      console.log("Loaded games:");
      console.log(games);
      callback(games);
  });
}

//see https://www.firebase.com/docs/web/guide/retrieving-data.html
Data.getMap = function (mapname, callback){
  console.log("Getting map with name " + mapname);
    var ref = getRef('maps/' + mapname);

    ref.once("value", function(data) {
      var map = data.val();
      console.log("Loaded map:");
      console.log(map);
      callback(map);
  });
}

Data.createGame = function(mapname, playername, callback){
  console.log("Creating game with map " + mapname);

  Data.getMap(mapname,function(map){
    console.log("Got our map! Now we can init game with it");
    console.log(map);
    var id = makeId();
    var date = new Date();
    var game = {
      id : id,
      created : date.toString(),
      createdtime : (date.getTime() / 1000),
      createddate : date.getDate(),
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
      explosions : '',
      players : {
        /*
        b : {name : playername, money : 100},
        r : {name : false, money : 100},
        g : {name : false, money : 100},
        y : {name : false, money : 100}
        */
      }
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
  console.log("Updating game grid for game " + gameid);
  var ref = getRef('games/' + gameid);
  ref.set(newgame);
}

Data.getGame = function (gameid, callback){
  console.log("Getting game with id " + gameid);
  var ref = getRef('games/' + gameid);

    ref.once("value", function(data) {
      var game = data.val();
      console.log("Loaded game:");
      console.log(game);
      callback(game);
  });
}
