//from firebase test app
/*
Firebase.enableLogging(true);
var f = new Firebase('https://metachat.firebaseio.com/');

f.transaction(function(curr) {
  if (isNaN(parseFloat(curr)))
    return 1; // initialize to 1.
  else
    return curr + 1; // increment.
}, function() {
    // Once the transaction has completed, update the UI (and watch for updates).
    f.on('value', function(s) {
      document.getElementById('contents').innerHTML = s.val();
    });
  });
*/

//from the chrome example app
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}

//from firebase tutorial
getCurrentTabUrl(function(currenturl){
      var displayurl = currenturl.replace(/https?:\/\//,'').replace(/\/.*/,'');
      var cleanurl = currenturl.replace('\.','_dot_').replace(/https?:\/\//,'').replace(/\/.*/,'');
      $('#sitename').html(displayurl);

      var myDataRef = new Firebase('https://metachat.firebaseio.com/' + cleanurl + '/');

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

      function displayChatMessage(name, text) {
        var authorclass = 'author';
        if (name == window.username) authorclass += ' me';

        $('<div class="message"/>').text(text).prepend($('<span class="'+authorclass+'" />').text(name+': ')).appendTo($('#messagesDiv'));
        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
      };
});

//$('#sitename').html('jquery test');
