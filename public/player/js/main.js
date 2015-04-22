$ = jQuery = require('jquery');
//require('./lib/flat.audio');
require('./lib/jquery.jplayer');
//require('./lib/FeedEk');
require('./lib/jquery.zrssfeed');

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
  /*$('#rss').FeedEk({
    FeedUrl:'http://localhost:3000/archive/4_d_meltdown_podcast.rss',
    MaxCount : 5,
    ShowDesc : true,
    ShowPubDate:true,
    DescCharacterLimit:100,
    TitleLinkTarget:'_blank'
  });*/
   $('#rss').rssfeed('http://growradio.org/data/archive/4_d_meltdown_podcast.rss', {
      limit: 5
    });

   $('#rss').click(function(e){
      e.preventDefault();
      var l = e.target.href.split('/');
      $('#player').jPlayer('setMedia',{
        title: l[l.length-1],
        mp3: e.target.href
      });
      $('#player').jPlayer('play');
   });
});



//wavesurfer.load('https://s3.amazonaws.com/growradio/no_filler/no_filler_2014120400.mp3');