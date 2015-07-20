var React = require('react');

module.exports = React.createClass({
	componentDidMount: function(){
		this.jp = $('#player');
		this.play = function(name,path){
			this.jp.jPlayer('setMedia',{
		        title: name,
		        mp3: path
		    });
		      
		    this.jp.jPlayer('play');
		}
		this.stop = function(){
			this.jp.jPlayer('stop');
		}
	  	this.jp.jPlayer({
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

		);
	}
})