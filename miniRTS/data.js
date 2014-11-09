//firebase stuff

var Data = {};

Data.baseUrl = 'https://woutertest.firebaseio.com/miniRTS/maps';

Data.saveMap = function (mapname, grid){
  console.log("Will save map with name " + mapname);
  // CREATE A REFERENCE TO FIREBASE
  var mapRef = new Firebase(Data.baseUrl);

  mapRef.child(mapname).set({grid : grid, name : mapname});
}

Data.getMaps = function(callback){
  var mapRef = new Firebase(Data.baseUrl);
  mapRef.on('child_added', function(snapshot) {
        var map = snapshot.val();
        callback(map);
      });
}
