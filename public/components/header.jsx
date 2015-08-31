var React = require('react')

module.exports = React.createClass({
	render: function(){
		return (
			<div>
				<h3><b>{this.props.bold}</b>{this.props.normal}</h3>
			</div>
			)
	}
})