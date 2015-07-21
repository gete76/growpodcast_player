var React = require('react');
//require('../../lib/jquery.jplayer');
//require('./lib/FeedEk');
//require('../../lib/jquery.zrssfeed');


module.exports = React.createClass({displayName: "exports",
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
			React.createElement("div", {id: "player-wrapper"}, 
			  React.createElement("div", {id: "player", className: "jp-jplayer"}), 

			  React.createElement("div", {id: "jp_container_1", className: "jp-flat-audio", role: "application", "aria-label": "media player"}, 
			    React.createElement("div", {className: "jp-play-control jp-control"}, 
			      React.createElement("button", {className: "jp-play jp-button", role: "button", "aria-label": "play", tabIndex: "0"})
			    ), 
			    React.createElement("div", {className: "jp-bar"}, 
			      React.createElement("div", {className: "jp-seek-bar jp-seek-bar-display"}), 
			      React.createElement("div", {className: "jp-seek-bar"}, 
			        React.createElement("div", {className: "jp-play-bar"}), 
			        React.createElement("div", {className: "jp-details"}, React.createElement("span", {className: "jp-title", "aria-label": "title"})), 
			        React.createElement("div", {className: "jp-timing"}, React.createElement("span", {className: "jp-duration", role: "timer", "aria-label": "duration"}))
			      )
			    ), 
			    React.createElement("div", {className: "jp-no-solution"}, 
			      "Media Player Error", React.createElement("br", null), 
			      "Update your browser or Flash plugin"
			    )
			  )
			)
		)
	}
})