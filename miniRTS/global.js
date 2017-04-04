$(document).ready(function(){

function debug(smt){
  console.log(smt);
}

function loadPage(page,callbackFunction){
    debug("Loading page " + page + " ...");
    var filename = 'page-' + page + '.html';

      debug("Will load file " + filename);

      $('.navbar-nav li').removeClass('active');
      $('#nav-' + page).parent().addClass('active');

      $('#globalcontainer').load(filename, function(){
        debug('loaded file');
      });

    if (typeof callbackFunction == 'function') callbackFunction();
}

$('.navbar-nav a').click(function(e){
  e.preventDefault();
  var page = $(this).data('file');

});

loadPage('home', function(){debug("Home page initialized!")});

});
