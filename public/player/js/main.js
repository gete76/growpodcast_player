//window.jQuery = $ = require('jquery');

//require('materialize-css/bin/materialize');
//require('./lib/materialize');
//require('./lib/flat.audio');
var React = require('react');
var Player = require('./react/build/player');
var _ = require('lodash');

$(document).ready(function(){

  /*$('#rss').FeedEk({
    FeedUrl:'http://localhost:3000/archive/4_d_meltdown_podcast.rss',
    MaxCount : 5,
    ShowDesc : true,
    ShowPubDate:true,
    DescCharacterLimit:100,
    TitleLinkTarget:'_blank'
  });*/
  $('#rss').rssfeed('http://growradio.org/data/archive/the_conch_podcast.rss', {
    limit: 5
  });
  
  React.render(<Player />, document.getElementById('react-player'));

  $('#rss').click(function(e){
      e.preventDefault();
      var l = e.target.href.split('/');
      var name = l[l.length-1].split('_');
      var date = name.pop();
      name = _.capitalize(name.join(' '));
      date = date.substring(0,4)+'-'+date.substring(4,6)+'-'+date.substring(6,8);

      Player.play(name+' - '+date, e.target.href);
  });
  
  $(".button-collapse").sideNav();
   //$('#nav-block').pushpin({ top: $('#nav-block').offset().top });
});



//wavesurfer.load('https://s3.amazonaws.com/growradio/no_filler/no_filler_2014120400.mp3');