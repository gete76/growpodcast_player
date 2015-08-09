//window.jQuery = $ = require('jquery');

//require('materialize-css/bin/materialize');
//require('./lib/materialize');
//require('./lib/flat.audio');
var React = require('react');
var Player = require('./react/build/player');
var Container = require('./react/build/container');
var Navbar = require('./react/build/navbar');
var Mobile = require('./react/build/mobilenav');
var _ = require('lodash');
//var awslist = require('./lib/awslist');

$(document).ready(function(){

  /*$('#rss').FeedEk({
    FeedUrl:'http://localhost:3000/archive/4_d_meltdown_podcast.rss',
    MaxCount : 5,
    ShowDesc : true,
    ShowPubDate:true,
    DescCharacterLimit:100,
    TitleLinkTarget:'_blank'
  });*/
  /*$('#rss').rssfeed('http://growradio.org/data/archive/the_conch_podcast.rss', {
    limit: 5
  });*/
  /*AWS.config.region = 'us_standard';
  var bucket = new AWS.S3({
      params: {
          Bucket: 'growradio'
      }
  });

  bucket.listObjects({},function(err,data){
    debugger
  })*/
  /*awslist({
    bucket: 'https://growrado.s3-us.amazonaws.com',
    root: 'rss/',
    ignore: true
  }, function(list){
    debugger;
  });*/

  var clickNav = function(button){
    React.render(<Container shows={fileList} page={button} />, document.getElementById('listing'));
  }
  var fileList = {};
  $.get('https://growradio.s3.amazonaws.com',function(resp){
    var filex = resp.getElementsByTagName('Contents');
    
  
    for(i=0;i<filex.length; i++){ 
        var fileData = [];
        var item = filex[i];
        //fileList[i] = fileData;
        size = item.getElementsByTagName('Size')[0].firstChild.data;
        name = item.getElementsByTagName('Key')[0].firstChild.data;
        lastmod = filex[i].getElementsByTagName('LastModified')[0].firstChild.data;
        link = "<A HREF=\""+name+"\">"+name+"</A>";

        var split = name.split('/');
        if(_.isUndefined(fileList[split[0]])){
            fileList[split[0]] = [];
        }
        if(split.length > 1){
            fileList[split[0]].push(split[1]);
        }
        /*fileData[0] = name;
        fileData[1] = size;
        fileData[2] = lastmod;
        fileData[3] = link;
        */
    }

    React.render(<Container shows={fileList} />, document.getElementById('listing'));
  });
  React.render(<Mobile clickNav={clickNav} />, document.getElementById('mobile-wrapper'), function(){
    React.render(<Navbar clickNav={clickNav} />, document.getElementById('nav-wrapper'), function(){
      $(".button-collapse").sideNav();
    });    
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
  
  
   //$('#nav-block').pushpin({ top: $('#nav-block').offset().top });
});



//wavesurfer.load('https://s3.amazonaws.com/growradio/no_filler/no_filler_2014120400.mp3');