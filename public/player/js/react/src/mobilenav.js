var $ = require('jquery');
var React = require('react');
var _ = require('lodash');

module.exports = React.createClass({
	clickNav: function(e){
		//e.preventDefault();
		this.props.clickNav(e.target.href.split('/').pop());
	},
	render: function(){
		return (
		  <ul id="nav-mobile" className="side-nav"  onClick={this.clickNav}>
		    <li><a href="shows">Shows</a></li>
		    <li><a href="archive">Archive</a></li>
		    <li><a href="old">Grow Radio Archives</a></li>
		  </ul>
		)
	}
})