var React = require('react')
var Header = require("./header");
var RadioGroup = require("./radioGroup")

module.exports = React.createClass({
	render: function(){
		return(
			<div className="col-md-12">
				<Header bold="Condtion " normal="(Select one)" />
				<RadioGroup enums={this.props.enums} name="condition.description" onChange={this.props.onChange} checked={this.props.value} />
			</div>
		)
	}
})

