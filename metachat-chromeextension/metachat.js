//from firebase test app


function displayChatMessage(name, text) {
  var authorclass = 'author';
  if (name == window.username) authorclass += ' me';

  $('<div class="message"/>').text(text).prepend($('<span class="'+authorclass+'" />').text(name+': ')).appendTo($('#messagesDiv'));
  $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};

//from firebase tutorial
showMessagesForRoom = function(roomname){
      $('#sitename').html(roomname);

      var myDataRef = new Firebase('https://metachat.firebaseio.com/' + roomname + '/');

      //remember username?
      /*
      chrome.storage.sync.get('username', function(value){
        if (typeof value !== 'undefined') window.username = value;
      };
      */

      //$('#chatform').submit(function (e) {
      $('#messageInput').keypress(function (e) {
        if (e.keyCode == 13) {
            window.username = $('#nameInput').val();
            /*
          if (typeof window.username == 'undefined'){
            chrome.storage.sync.set({'username': window.username}, function() {
              //username saved!
            });
          }
          */
          var text = $('#messageInput').val();
          myDataRef.push({name: window.username, text: text});
          $('#messageInput').val('');

        }
      });

      myDataRef.on('child_added', function(snapshot) {
        var message = snapshot.val();
        displayChatMessage(message.name, message.text);
      });

};

//get rooms
function getRooms(){
        var roomRef = new Firebase('https://metachat.firebaseio.com');

      roomRef.on('child_added', function(snapshot) {
        var roomname = snapshot.name();
        $('<a class="room" data-roomname="'+roomname+'" href="#">'+roomname+'</a>').appendTo($('#roomslist'));
      });

      $('#roomslist').on('click', 'a', function(e){
        e.preventDefault();
          var roomname = $(this).data('roomname');
          $('#messagesDiv').html('');
          showMessagesForRoom(roomname);
      });
}

getRooms();
