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
	    this.setState({})
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
  	submitForm: function(){
  		console.log("Form data:", this.state.req);
  		alert("Form submitted")
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
					<button id="submit" onClick={this.submitForm} className="btn btn-primary">Save!</button>
				</form>
			)
		}
	}
})

React.render(
	<div>
		<ItemForm />
	</div>,
	document.getElementById('content')
	)