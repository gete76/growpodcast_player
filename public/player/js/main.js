$ = jQuery = require('jquery');
require('./lib/flat.audio');
require('./lib/jquery.jplayer');

$(document).ready(function(){
  $('#player').jPlayer({
    ready: function () {
      $(this).jPlayer("setMedia", {
        title: "No Filler - Dec 04 2014",
        mp3: 'https://s3.amazonaws.com/growradio/no_filler/no_filler_2014120400.mp3'
      });
    },
    cssSelectorAncestor: "#jp_container_1",
    swfPath: "/js",
    supplied: "mp3",
    useStateClassSkin: true,
    autoBlur: false,
    smoothPlayBar: true,
    keyEnabled: true,
    remainingDuration: true,
    toggleDuration: true
  });
});

//wavesurfer.load('https://s3.amazonaws.com/growradio/no_filler/no_filler_2014120400.mp3');