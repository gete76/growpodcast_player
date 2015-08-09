var $ = require('jquery');
var React = require('react');
var _ = require('lodash');
var Player = require('./player');

module.exports = React.createClass({displayName: "exports",
	playShow: function(e){
		e.preventDefault();
		Player.play(e.target.id, e.target.href);
	},
	render: function(){
		var podcasts = [];
		var self = this, name;
		this.props.show.forEach(function(item){
			name = item.split('_');
			var date = name.pop();
			podcasts.push(
				React.createElement("div", {key: item}, 
					React.createElement("a", {id: item, className: "mp3", href: "https://s3.amazonaws.com/growradio/" + name.join('_')+'/'+item, onClick: self.playShow}, _.capitalize(item.split('_').join(' ')))
				)
			)
		});

		return (
			React.createElement("div", {id: "show"}, 
				React.createElement("h3", null, "Archived Show: ", _.capitalize(name.join(' '))), 
				podcasts
			)
		)
	}
})