var React = require('react');
//require('../../lib/jquery.jplayer');
//require('./lib/FeedEk');
//require('../../lib/jquery.zrssfeed');


module.exports = React.createClass({
	statics: {
		play: function(name,path){
			$('.jp-flat-audio').show();
			
			$('#player').jPlayer('setMedia',{
		        title: name,
		        mp3: path
		    });
		    $('#player').jPlayer('play');			
		},
		stop: function(){
			$('#player').jPlayer('stop');
		}
	},
	componentDidMount: function(){
	  	$('#player').jPlayer({
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
	},
	render: function(){
		return(
			<div id="player-wrapper">
			  <div id="player" className="jp-jplayer"></div>

			  <div id="jp_container_1" className="jp-flat-audio" role="application" aria-label="media player">
			    <div className="jp-play-control jp-control">
			      <button className="jp-play jp-button" role="button" aria-label="play" tabIndex="0"></button>
			    </div>
			    <div className="jp-bar">
			      <div className="jp-seek-bar jp-seek-bar-display"></div>
			      <div className="jp-seek-bar">
			        <div className="jp-play-bar"></div>
			        <div className="jp-details"><span className="jp-title" aria-label="title"></span></div>
			        <div className="jp-timing"><span className="jp-duration" role="timer" aria-label="duration"></span></div>
			      </div>
			    </div>
			    <div className="jp-no-solution">
			      Media Player Error<br />
			      Update your browser or Flash plugin
			    </div>
			  </div>
			</div>
		)
	}
})