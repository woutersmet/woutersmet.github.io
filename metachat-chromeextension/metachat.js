//from firebase test app

window.currentSite = 'NO_SITE_SELECTED';
window.currentRoom = 'NO_ROOM_SELECTED';
window.currentUser = 'NO_USER_SELECTED';

function displayChatMessage(name, text) {
  var authorclass = 'author';
  if (name == window.username) authorclass += ' me';

  $('<div class="message"/>').text(text).prepend($('<span class="'+authorclass+'" />').text(name+': ')).appendTo($('#messagesDiv'));
  $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};

createRoom = function(siteName, roomName){
  //alert('creating room ' + roomName);
    var roomRef = new Firebase('https://metachat.firebaseio.com/rooms/' + siteName + '/' + roomName);
    roomRef.update({
        name: roomName, 
        datecreated : Firebase.ServerValue.TIMESTAMP, 
        site : siteName, 
        hello : ' hello this is a room'
      });

    var roomRef = new Firebase('https://metachat.firebaseio.com/messages/' + siteName + '/' + roomName + '/');
    roomRef.push({author : 'system_user', message : 'first message (auto created upon room creation)'})

    return roomName;
}

createUser = function(userName){
    var usersRef = new Firebase('https://metachat.firebaseio.com/users/' + userName);
    usersRef.update({
        username: userName, 
        datecreated : Firebase.ServerValue.TIMESTAMP
      });

    return userName;
}

createSite = function(siteName){
    var sitesRef = new Firebase('https://metachat.firebaseio.com/sites/' + siteName);
    sitesRef.update({
        name: siteName, 
        datecreated : Firebase.ServerValue.TIMESTAMP, 
        site : 'some_site_dot_com'
      });

    createRoom(siteName, 'site_global_room');

    return siteName;
}

$('#newroombutton').click(function(){
  var roomName = prompt('name of room within site '+window.currentSite+'?');
  createRoom(window.currentSite, roomName);

  getRoomsForSite(window.currentSite);
  return false;
});

$('#newsitebutton').click(function(){
  var siteName = prompt('site name?');
  createSite(siteName);
  return false;
});

addMessageToRoom = function(siteName,roomName,author,text){
  alert('adding message');
    var myDataRef = new Firebase('https://metachat.firebaseio.com/messages/' + siteName + '/' + roomName + '/');
    myDataRef.push({name: author, text: text});
}

//from firebase tutorial
showMessagesForRoom = function(roomname){
  alert('getting messages for room...');

      var myDataRef = new Firebase('https://metachat.firebaseio.com/messages/' + window.currentSite + '/'  + roomname + '/');

      //remember username?
      /*
      chrome.storage.sync.get('username', function(value){
        if (typeof value !== 'undefined') window.username = value;
      };
      */

      //$('#chatform').submit(function (e) {
      $('#messageInput').keypress(function (e) {
        if (e.keyCode == 13) {
            /*
          if (typeof window.username == 'undefined'){
            chrome.storage.sync.set({'username': window.username}, function() {
              //username saved!
            });
          }
          */
          var text = $('#messageInput').val();
          addMessageToRoom(window.currentSite, window.currentRoom,window.currentUser,text);
          $('#messageInput').val('');
        }
      });

      myDataRef.on('child_added', function(snapshot) {
        var message = snapshot.val();
        displayChatMessage(message.name, message.text);
      });
};

function onRoomActivated(roomName){
  $('#messagesDiv').html('');
  window.currentRoom = roomName;
  $('.currentroomname').html(roomName);

  showMessagesForRoom(roomName);
}

//get rooms
function getRoomsForSite(siteName){
  alert('getting rooms for site ' + siteName);
  var roomRef = new Firebase('https://metachat.firebaseio.com/rooms/' + siteName + '/');

  roomRef.on('child_added', function(snapshot) {
    var roomname = snapshot.name();
    $('<a class="list-item room" data-roomname="'+roomname+'" href="#">'+roomname+'</a>').appendTo($('#roomslist'));
  });

  $('#roomslist').on('click', 'a', function(e){
      e.preventDefault();
      onRoomActivated($(this).data('roomname'));
  });
}

function getSites(){
        var siteRef = new Firebase('https://metachat.firebaseio.com/sites/');

      siteRef.on('child_added', function(snapshot) {

        var sitename = snapshot.name();
        //alert('detected site ' + sitename);
        $('<a class="list-item site" data-sitename="'+sitename+'" href="#">'+sitename+'</a>').appendTo($('#siteslist'));
      });

      $('#siteslist').on('click', 'a', function(e){
        e.preventDefault();
          var siteName = $(this).data('sitename');

          getRoomsForSite(siteName);
          window.currentSite = siteName;
          $('#messagesDiv').html('');
          $('.currentsitename').html(siteName);
      });
}

getSites();

var setCurrentUser = function (username){

  window.currentUser = username;  
  $('.currentusername').html(username);
  $('#loginprompt').hide();
  $('#messageinputs').show();
}

$('#loginform').submit(function(e){
  e.preventDefault();
  var username = $('#usernameInput').val();
  var password = $('#passwordInput').val();
  var valid = true;
  if (valid) {
    setCurrentUser(username);
  }
  else {
    alert('wrong username!');
  }
})
