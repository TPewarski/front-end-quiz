var React = require('react');

module.exports = React.createClass({
	render: function(){
		return (
			<div>
				<select style={{width: "50%"}} className="form-control" value={this.props.value} name={this.props.name} onChange={this.props.onChange}>
					{this.props.enums.map(function(option){
						return <option value={option}>{option}</option>
					})}
				</select>
			</div>
		)
	}
})