var React = require('react');
module.exports = React.createClass(({
	render: function(){
		var self = this
		return(
			<span id="radioGroup">
				{self.props.enums.map(function(option){
					return (
						<span>
							<input type="radio" name={self.props.name} onChange={self.props.onChange} value={option} checked={self.props.checked == option ? true : false} />
							<span>{option}</span>
						</span>
					)
				})}
			</span>
		)
	}
}))