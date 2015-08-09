var $ = require('jquery');
var React = require('react');
var _ = require('lodash');
var Player = require('./player');

module.exports = React.createClass({
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
				<div key={item}>
					<a id={item} className="mp3" href={"https://s3.amazonaws.com/growradio/" + name.join('_')+'/'+item} onClick={self.playShow}>{_.capitalize(item.split('_').join(' '))}</a> 
				</div>
			)
		});

		return (
			<div id="show">
				<h3>Archived Show: {_.capitalize(name.join(' '))}</h3>
				{podcasts}
			</div>
		)
	}
})