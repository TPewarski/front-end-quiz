var React = require('react')
var Title = require('./title');
var Description = require('./description');
var InternalNotes = require('./internalNotes');
var Materials = require('./materials');
var Measurements = require('./measurements');
var Condition = require('./condition');


var ItemForm = React.createClass({
	getInitialState: function(){
		return {
			isLoading: true
		}
	},
	componentDidMount: function(){
	    var self = this;
	    var enumsDone = false

	    Promise.all([
	      fetch('json/enums.json').then(function(resp){
	        return resp.json()
	      }).then(function(data){
	        self.setState(data)
	      }),
	      fetch('json/item.json').then(function(resp){
	        return resp.json()
	      }).then(function(data){
	        self.setState({req: data.result.item})
	      })
	    ]).then(function () {
	      self.setState({isLoading: false})
	    })
	},
	toggleCheck: function(){
	    if(this.state.req.material.restricted == "N"){
	      this.state.req.material.restricted = "Y";
	    }else{
	      this.state.req.material.restricted = "N"
	    }
    	console.log("Checkbox state", this.state.req.material.restricted)
  	},
	updateReq: function(){
	    var reqObj = this.state.req
	    var name = event.target.name
	    var period = name.indexOf(".")

	    if(period > -1){
	      reqObj[name.slice(0, period)][name.slice(period+1)] = event.target.value
	    }else{
	      reqObj[event.target.name] = event.target.value
	    }

	    console.log("reqObj", reqObj)
	    this.setState({})
  	},	
	render: function(){
		if(this.state.isLoading){
			return <h1>Loading</h1>
		}else{
			var title = this.state.req.title
			var description = this.state.req.description;
			var internalDealerNotes = this.state.req.dealerInternalNotes;
			var materialEnums = this.state.itemEnums.material
			var material = this.state.req.material
			var measurements = this.state.req.measurement
			var measurementEnums = this.state.itemEnums.measurement
			var condition = this.state.req.condition.description
			var conditionEnums = this.state.itemEnums.condition.description
			return (
				<form className="col-md-8">
					<div className="form-group">
						<h1>Item Form</h1>
						<Title value={title} onChange={this.updateReq} />
						<Description value={description} onChange={this.updateReq} />
						<InternalNotes value={internalDealerNotes} onChange={this.updateReq} />
						<Materials value={material} onChange={this.updateReq} enums={materialEnums} toggleCheck={this.toggleCheck} />
						<Measurements value={measurements} onChange={this.updateReq} enums={measurementEnums} />
						<Condition value={condition} onChange={this.updateReq} enums={conditionEnums} />
					</div>
					<button style={{margin: "10px"}} className="btn btn-primary">Save!</button>
				</form>
			)
		}
	}
})



// var Header = React.createClass({
// 	render: function(){
// 		return (
// 			<div>
// 				<h3><b>{this.props.bold}</b>{this.props.normal}</h3>
// 			</div>
// 			)
// 	}
// })
// var Selector = React.createClass({
// 	render: function(){
// 		return (
// 			<div>
// 				<select style={{width: "50%"}} className="form-control" value={this.props.value} name={this.props.name} onChange={this.props.onChange}>
// 					{this.props.enums.map(function(option){
// 						return <option value={option}>{option}</option>
// 					})}
// 				</select>
// 			</div>
// 		)
// 	}
// })

// var RadioGroup = React.createClass(({
// 	render: function(){
// 		var self = this
// 		console.log("this.props.enums", this.props.enums)
// 		return(
// 			<span>
// 				{self.props.enums.map(function(option){
// 					return (
// 						<span style={{padding: "5px"}}>
// 							<input style={{margin: "5px"}} type="radio" name={self.props.name} onChange={self.props.onChange} value={option} checked={self.props.checked == option ? true : false} />
// 							<span>{option}</span>
// 						</span>
// 					)
// 				})}
// 			</span>
// 		)
// 	}
// }))

// var Title = React.createClass({
// 	render: function(){
// 		return (
// 			<div className="col-md-12">
// 				<Header bold="Title" />
// 				<input className="form-control" value={this.props.value} onChange={this.props.onChange} type="text" name="title" />
// 			</div>
// 		)
// 	}
// })

// var Description = React.createClass({
// 	render: function(){
// 		console.log("description value", this.props.value)
// 		return (
// 			<div className="col-md-12">
// 				<Header bold="Description" />
// 				<textarea className="form-control" value={this.props.value} onChange={this.props.onChange} name="description" rows="10" />
// 			</div>
// 		)
// 	}
// })

// var InternalNotes = React.createClass({
// 	render: function(){
// 		return (
// 			<div className="col-md-12">
// 				<Header bold="Internal Notes" />
// 				<textarea className="form-control" value={this.props.value} onChange={this.props.onChange} name="dealerInternalNotes" rows="4" />
// 			</div>
// 		)
// 	}
// })

// var Materials = React.createClass({
// 	render: function(){
// 		return (
// 			<div className="col-md-12">
// 				<Header bold="Materials" />
// 				<Selector value={this.props.value.description} enums={this.props.enums} onChange={this.props.onChange} name="material.description" />
// 				<input type="checkBox" value={this.props.value.restricted} onChange={this.props.toggleCheck} />
// 				<span><b> Check this box</b> if the listing contains or may contain restricted materials</span>
// 			</div>
// 		)
// 	}
// })

// var Measurements = React.createClass({
// 	getInitialState: function(){
//     return {
//       shape: this.props.value.shape,
//       unit: this.props.value.unit
//     }
//   },
//   handleChange: function(){
//     this.props.onChange()
//     if(event.target.name == "measurement.unit"){
//     	this.setState({unit: event.target.value})
//     }else{
// 	    this.setState({shape: event.target.value})
//     }
//   },
//   render: function(){
//   	var self = this;
//   	return (
//   		<div className="col-md-12">
// 	  		<Header bold="Measurements" />
// 	  		<p>Measurements are in: 
// 		  		<input style={{margin: "5px"}} type="radio" checked={this.props.value.unit == "in" ? true : false} name="measurement.unit" value="in" onChange={this.handleChange} />
// 		  		<span> Inches(in) </span>
// 		  		<input style={{margin: "5px"}} type="radio" checked={this.props.value.unit == "cm" ? true : false} name="measurement.unit" value="cm" onChange={this.handleChange} />
// 		  		<span> Centimeters(cm) </span>
// 		  	</p>
// 		  	<p>Measured item is: 
// 		  		<RadioGroup enums={this.props.enums.shape} name="measurement.shape" onChange={this.handleChange} checked={this.state.shape} />
// 		  	</p>
// 	  		<div className="col-md-6">
// 	  		  <Header bold="Length" />
// 	  		  <span className="input-group">
// 		          <input className="form-control" value={this.props.value.length} onChange={this.props.onChange} name="measurement.length" disabled={this.state.shape == "Rectangular" ? false : true} /><span className="input-group-addon">{this.state.unit}</span>
// 	          </span>
// 	          <Header bold="Depth" />
// 	          <span className="input-group"> 
// 		          <input className="form-control" value={this.props.value.depth} onChange={this.props.onChange} name="measurement.depth" disabled={this.state.shape == "Rectangular" ? false : true} /><span className="input-group-addon">{this.state.unit}</span>
// 	          </span>
// 	        </div>
// 	        <div className="col-md-6" >
// 	          <Header bold="Height" />
// 	          <span className="input-group">
// 		          <input className="form-control" value={this.props.value.height} onChange={this.props.onChange} name="measurement.height" disabled={this.state.shape == "Rectangular" ? false : true} /><span className="input-group-addon">{this.state.unit}</span>
// 	          </span>
//         	  <Header bold="Diameter" /> 
//         	  <span className="input-group">
// 		          <input className="form-control" value={this.props.value.diameter} onChange={this.props.onChange} name="measurement.diameter" disabled={this.state.shape == "Circular" ? false : true} /><span className="input-group-addon">{this.state.unit}</span>
// 	          </span>
// 	        </div>
// 	  	</div>
//   	)
//   }
// })

// var Condition = React.createClass({
// 	render: function(){
// 		return(
// 			<div className="col-md-12">
// 				<Header bold="Condtion " normal="(Select one)" />
// 				<RadioGroup enums={this.props.enums} name="condition.description" onChange={this.props.onChange} checked={this.props.value} />
// 			</div>
// 		)
// 	}
// })


React.render(
	<ItemForm />,
	document.getElementById('content2')
	)