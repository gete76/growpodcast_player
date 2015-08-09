
//var $ = require('jquery');
var React = require('react');
var _ = require('lodash');
//require('../../lib/materialize.min');

module.exports = React.createClass({displayName: "exports",
	clickNav: function(e){
		e.preventDefault();
		this.props.clickNav(e.target.href.split('/').pop());
	},
	render: function(){
		return (
		    React.createElement("nav", {id: "nav-block", className: "light-green"}, 

		      React.createElement("div", {className: "container"}, 
		        React.createElement("div", {className: "nav-wrapper"}, 

		          React.createElement("ul", {id: "nav", className: "right hide-on-med-and-down", onClick: this.clickNav}, 
		          	React.createElement("li", null, React.createElement("a", {href: "shows"}, "Shows")), 
		          	React.createElement("li", null, React.createElement("a", {href: "archive"}, "Archive")), 
		            React.createElement("li", null, React.createElement("a", {href: "old"}, "Grow Radio Archives"))
		          ), React.createElement("a", {href: "#", "data-activates": "nav-mobile", className: "right button-collapse"}, React.createElement("i", {className: "mdi-navigation-menu"}))
		        )
		      )
		    )
		)
	}
});