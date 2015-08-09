
var $ = require('jquery');
var React = require('react');
var _ = require('lodash');

module.exports = React.createClass({
	getInitialState: function(){
		return {shows: []};
	},
	componentDidMount: function(){
		var self = this;
	},
	clickShow: function(e){
		e.preventDefault();
		var show = this.props.shows[e.target.id];
		this.props.setPage('show',show);
	},
	render: function(){
		var shows = [];
		var self = this;

	    _.each(this.props.shows, function(v,k){
			var name = _.capitalize(k.split('_').join(' '));

			shows.push(
				<a className="show z-depth-2" key={k} id={k} href="#" onClick={self.clickShow}>{name}</a>
			);
	    });

		return (
			<div id="shows">
				<h2>Our Past Shows</h2>
				{shows}
			</div>
		)
	}
})