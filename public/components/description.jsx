var React = require('react')
var Header = require("./header");

module.exports= React.createClass({
	render: function(){
		return (
			<div className="col-md-12">
				<Header bold="Description" />
				<textarea className="form-control" value={this.props.value} onChange={this.props.onChange} name="description" rows="10" />
			</div>
		)
	}
})