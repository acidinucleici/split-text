// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
function explodeText(string){

  var out = ' ';
  var strArray = string.split(' ');
  $.each(strArray, function(index, el){
    out += '<span class="parola">'+el+'</span> ';
  });
  return out.trim();
}

function explodeChars(chars){
  var out = '';
  var chrArray = chars.split('');
  $.each(chrArray, function(index, el){
    out += '<span class="caratteri">'+el+'</span>';
  });
  return out.trim();
}

//SPLIT TEXT
//ciclare la parola stessa, considerarla come array di caratteri
//span lettera
//split text di greensock

//javascript prototype examples
