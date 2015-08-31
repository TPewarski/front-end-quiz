var React = require('react')
var Header = require("./header");

module.exports = React.createClass({
	render: function(){
		return (
			<div className="col-md-12">
				<Header bold="Internal Notes" />
				<textarea className="form-control" value={this.props.value} onChange={this.props.onChange} name="dealerInternalNotes" rows="4" />
			</div>
		)
	}
})