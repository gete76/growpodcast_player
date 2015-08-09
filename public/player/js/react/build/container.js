var React = require('react');
var _ = require('lodash');

var url = require('../../lib/url')

var Shows = require('./shows');
var Show = require('./show');

module.exports = React.createClass({displayName: "exports",
	getInitialState: function(){
		return {page:  url(1), data: this.props.shows};
	},
	componentWillReceiveProps: function(nextProps){
		if(_.has(nextProps, 'page')){
			debugger
			this.setState({page: nextProps.page, data: this.props.shows});
		}
	},
	setPage: function(page, data){
		this.setState({page: page, data: data});
	},
	loadPage: function(){
		var comp;
		switch(this.state.page){
			case 'shows':
				comp = React.createElement(Shows, {setPage: this.setPage, shows: this.props.shows});
				break;
			case 'show':
				comp = React.createElement(Show, {show: this.state.data})
				break;
			default:
			    comp = React.createElement("span", null);
			    break;
		}
		return comp;
	},
	render: function(){
		var comp = this.loadPage();
		return (
			React.createElement("div", {id: "page-container"}, 
				comp
			)
		)
	}
});