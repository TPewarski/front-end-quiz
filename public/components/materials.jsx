var React = require('react')
var Header = require("./header");
var Selector = require("./selector");

module.exports = React.createClass({
	render: function(){
		return (
			<div className="col-md-12">
				<Header bold="Materials" />
				<Selector value={this.props.value.description} enums={this.props.enums} onChange={this.props.onChange} name="material.description" />
				<input type="checkBox" value={this.props.value.restricted} onChange={this.props.toggleCheck} checked={this.props.value.restricted == "Y" ? true : false}/>
				<span><b> Check this box</b> if the listing contains or may contain restricted materials</span>
			</div>
		)
	}
})