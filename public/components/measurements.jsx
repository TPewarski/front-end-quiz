var React = require('react')
var Header = require("./header");
var RadioGroup = require("./radioGroup")

module.exports = React.createClass({
	getInitialState: function(){
    return {
      shape: this.props.value.shape,
      unit: this.props.value.unit
    }
  },
  handleChange: function(){
    this.props.onChange()
    if(event.target.name == "measurement.unit"){
    	this.setState({unit: event.target.value})
    }else{
	    this.setState({shape: event.target.value})
    }
  },
  render: function(){
  	var self = this;
  	return (
  		<div className="col-md-12">
	  		<Header bold="Measurements" />
	  		<p>Measurements are in: 
		  		<input className="units" type="radio" checked={this.props.value.unit == "in" ? true : false} name="measurement.unit" value="in" onChange={this.handleChange} />
		  		<span> Inches(in) </span>
		  		<input className="units" type="radio" checked={this.props.value.unit == "cm" ? true : false} name="measurement.unit" value="cm" onChange={this.handleChange} />
		  		<span> Centimeters(cm) </span>
		  	</p>
		  	<p>Measured item is: 
		  		<RadioGroup enums={this.props.enums.shape} name="measurement.shape" onChange={this.handleChange} checked={this.state.shape} />
		  	</p>
	  		<div className="col-md-6">
	  		  <Header bold="Length" />
	  		  <span className="input-group">
		          <input className="form-control" value={this.props.value.length} onChange={this.props.onChange} name="measurement.length" disabled={this.state.shape == "Rectangular" ? false : true} /><span className="input-group-addon">{this.state.unit}</span>
	          </span>
	          <Header bold="Depth" />
	          <span className="input-group"> 
		          <input className="form-control" value={this.props.value.depth} onChange={this.props.onChange} name="measurement.depth" disabled={this.state.shape == "Rectangular" ? false : true} /><span className="input-group-addon">{this.state.unit}</span>
	          </span>
	        </div>
	        <div className="col-md-6" >
	          <Header bold="Height" />
	          <span className="input-group">
		          <input className="form-control" value={this.props.value.height} onChange={this.props.onChange} name="measurement.height" disabled={this.state.shape == "Rectangular" ? false : true} /><span className="input-group-addon">{this.state.unit}</span>
	          </span>
        	  <Header bold="Diameter" /> 
        	  <span className="input-group">
		          <input className="form-control" value={this.props.value.diameter} onChange={this.props.onChange} name="measurement.diameter" disabled={this.state.shape == "Circular" ? false : true} /><span className="input-group-addon">{this.state.unit}</span>
	          </span>
	        </div>
	  	</div>
  	)
  }
})
