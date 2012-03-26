/*
 * YouTube Lite Embed - jQuery plugin to embed light-weight YouTube videos
 *
 * Copyright (c) 2012 Amr Tj. Wallas
 *
 * Licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License:
 *   http://creativecommons.org/licenses/by-nc-sa/3.0/
 *
 * Project Home:
 *   https://github.com/TjWallas/YouTube-Lite-Embed
 * 
 * Website:
 *   http://tjwallas.weebly.com
 *
 * Version:  1.0
 *
 */
(function($){ 

function YTLiteEmbed() {
  $('.lite').each( function() {
    // initialize all!
    YTLiteInit(this);
  });

  return false;
}

function YTLiteInit(myDiv) {
  var vid = myDiv.id;
  var w = myDiv.style.width;
  var h = myDiv.style.height;

  var img = $(document.createElement('img'));
  img.attr({'class': 'lazy',
      'data-original': 'http://img.youtube.com/vi/'+vid+'/0.jpg',
      'width': w,
      'height':h,      
  });
  img.css({'position': 'relative', 'top': '0', 'left': '0' });
  img.lazyload();

  var a = $(document.createElement('a'));
  a.href='#';  

  var hoverImg = $('<img class="lite" src="http://lh4.googleusercontent.com/-QCeB6REIFlE/TuGUlY3N46I/AAAAAAAAAaI/9-urEUtpKcI/s800/youtube-play-button.png" />');
  // hoverImg width is 71px and height is 51px
  // this is a bad hack
  var hoverW = (parseInt(w)/2) - (71/2);
  var hoverH = (parseInt(h)/2) - (51/2);
  hoverImg.attr('style', 'position: absolute; left: '+hoverW+'px; top: '+hoverH+'px;');

  $(myDiv).append(a.append(img,hoverImg));

  a.click( function() {
    var div = this.parentNode;
    $(div).replaceWith("<embed src=\"http://www.youtube.com/v/"+div.id+"?version=3&autoplay=1\" type=\"application/x-shockwave-flash\" width=\""+div.style.width+"\" height=\""+div.style.height+"\" allowscriptaccess=\"always\"></embed>");
    return false;
  });

  $.ajax({
      url: 'http://gdata.youtube.com/feeds/api/videos/'+vid+'?v=2&fields=id,title&alt=json',
      dataType: 'json',      
      success: function(data) {
         $(document.getElementById(data.entry.id.$t.split(':')[3])).append('<div style="position:relative;margin:-'+h+' 5px;padding:5px;background-color:rgba(0,0,0,0.3);-moz-border-radius:7px;-webkit-border-radius:7px;border-radius:7px"><span style="font-weight:bold;font-size:16px;color:#ffffff;font-family:sans-serif;text-align:left;">'+data.entry.title.$t+'</span></div>');    
      }
  });
}



// jQuery function
$.fn.YTLite = function() {
    return this.each(function() {
      YTLiteInit(this);
    });
}

$(function() {
  YTLiteEmbed();
});
})(jQuery);

