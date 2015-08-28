var React = require('react');
module.exports = React.createClass(({
	render: function(){
		var self = this
		console.log("this.props.enums", this.props.enums)
		return(
			<span>
				{self.props.enums.map(function(option){
					return (
						<span style={{padding: "5px"}}>
							<input style={{margin: "5px"}} type="radio" name={self.props.name} onChange={self.props.onChange} value={option} checked={self.props.checked == option ? true : false} />
							<span>{option}</span>
						</span>
					)
				})}
			</span>
		)
	}
}))