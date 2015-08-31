var React = require('react')
var Header = require('./header')

module.exports = React.createClass({
	render: function(){
		return (
			<div className="col-md-12">
				<Header bold="Title" />
				<input className="form-control" value={this.props.value} onChange={this.props.onChange} type="text" name="title" />
			</div>
		)
	}
})