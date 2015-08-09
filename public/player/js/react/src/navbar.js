
//var $ = require('jquery');
var React = require('react');
var _ = require('lodash');
//require('../../lib/materialize.min');

module.exports = React.createClass({
	clickNav: function(e){
		e.preventDefault();
		this.props.clickNav(e.target.href.split('/').pop());
	},
	render: function(){
		return (
		    <nav id="nav-block" className="light-green">

		      <div className="container">
		        <div className="nav-wrapper">

		          <ul id="nav" className="right hide-on-med-and-down" onClick={this.clickNav}>
		          	<li><a href="shows">Shows</a></li>
		          	<li><a href="archive">Archive</a></li>
		            <li><a href="old">Grow Radio Archives</a></li>
		          </ul><a href="#" data-activates="nav-mobile" className="right button-collapse"><i className="mdi-navigation-menu"></i></a>
		        </div>
		      </div>
		    </nav>
		)
	}
});