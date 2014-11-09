//firebase stuff

var Data = {};

Data.baseUrl = 'https://woutertest.firebaseio.com/miniRTS/';

function makeId()
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

Data.saveMap = function (mapname, grid){
  console.log("Will save map with name " + mapname);
  // CREATE A REFERENCE TO FIREBASE
  var mapRef = getRef('maps');

  mapRef.child(mapname).set({grid : grid, name : mapname});
}

Data.getMaps = function(callback){
  mapRef = getRef('maps');

  mapRef.on('child_added', function(snapshot) {
        var map = snapshot.val();
        callback(map);
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
      map : mapname,
      grid : map.grid,
      players : {
        b : playername
      }
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

//creating a user
var ref = new Firebase(Data.baseUrl);
ref.createUser({
  email    : "bobtony@firebase.com",
  password : "correcthorsebatterystaple"
}, function(error) {
  if (error === null) {
    console.log("User created successfully");
  } else {
    console.log("Error creating user:", error);
  }
});
