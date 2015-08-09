var $ = require('jquery');
var React = require('react');
var _ = require('lodash');

module.exports = React.createClass({displayName: "exports",
	clickNav: function(e){
		//e.preventDefault();
		this.props.clickNav(e.target.href.split('/').pop());
	},
	render: function(){
		return (
		  React.createElement("ul", {id: "nav-mobile", className: "side-nav", onClick: this.clickNav}, 
		    React.createElement("li", null, React.createElement("a", {href: "shows"}, "Shows")), 
		    React.createElement("li", null, React.createElement("a", {href: "archive"}, "Archive")), 
		    React.createElement("li", null, React.createElement("a", {href: "old"}, "Grow Radio Archives"))
		  )
		)
	}
})