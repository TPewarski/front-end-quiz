var DibsForm = React.createClass({
  getInitialState: function(){
    return {
      "isLoading": true,
      "itemEnums": {
        material: [],
        measurement: {
          unit: {},
          shape: []
        },
        condition: {
          description: []
        } 
      },
      req: {
    "httpCode": 0,
    "message": "",
    "result": {
        "item": {
            "id": 0,
            "title": "",
            "description": "",
            "dealerInternalNotes": "",
            "material": {
                "description": "",
                "restricted": ""
            },
            "measurement": {
                "unit": "",
                "shape": "",
                "length": "",
                "depth": "",
                "height": ""
            },
            "condition": {
                "description": ""
            }
        }
    }
}
    };
  },

  componentDidMount: function(){
    //fetch to get enumerables
    var self = this;
    var enumsDone = false

    Promise.all([
      fetch('json/enums.json').then(function(resp){
        return resp.json()
      }).then(function(data){
        self.setState(data)
        //console.log("self.state", self.state)
      }),
      fetch('json/item.json').then(function(resp){
        return resp.json()
      }).then(function(data){
        self.setState({req: data})
      })
    ]).then(function () {
      self.setState({isLoading: false});
    })
  },
  updateReq: function(){
    var reqObj = this.state.req.result.item
    var name = event.target.name
    var period = name.indexOf(".")
    if(period > -1){
      //console.log("name2", name.slice(period+1) )
      //console.log("sliced val", reqObj[name.slice(0, period)][name.slice(period+1)])
      reqObj[name.slice(0, period)][name.slice(period+1)] = event.target.value
    }else{
      reqObj[event.target.name] = event.target.value
    }
    this.setState({})
    console.log("reqObj", reqObj)
    console.log("total state", this.state)
  },
  toggleCheck: function(){
    if(this.state.req.result.item.material.restricted == "N"){
      this.state.req.result.item.material.restricted = "Y";
    }else{
      this.state.req.result.item.material.restricted = "N"
    }
    //console.log("Checkbox state", this.state.req.result.item.material.restricted)
  },
  render: function() {
    //console.log(this.state.req.result.item.title)
    if(this.state.isLoading){
      return <h1>Loading</h1>
    }else{

      var title = this.state.req.result.item.title
      var description = this.state.req.result.item.description
      var internalNotes = this.state.req.result.item.dealerInternalNotes
      var material = this.state.req.result.item.material
      var condition = this.state.req.result.item.condition.description
      return (
        <form className="dibsForm">
         
          <h3>Title</h3>
          <input value={title} onChange={this.updateReq} type="text" name="title"></input>
          <TextArea state={description} name="description" onChange={this.updateReq} title="Description" rows="10" cols="50" />
          <TextArea state={internalNotes} name="dealerInternalNotes" onChange={this.updateReq} title="Internal Notes" rows="3" cols="50" />
          <Materials state={material.description} onChange={this.updateReq} materials={this.state.itemEnums.material} />
          <br />
          <CheckBox state={material.restricted} name="material.restricted" onChange={this.toggleCheck} /><b>Check this box</b> if the listing contains or may contain restricted material
          { /*console.log("this.state.measurement.unit", this.state.measurement.unit)*/}
          <ShapeDetails state={this.state.req.result.item.measurement} onChange={this.updateReq} units={this.state.itemEnums.measurement.unit} />
          <Condition state={condition} onChange={this.updateReq} types={this.state.itemEnums.condition.description} />
        </form>
      );
    }
    }
});


var TextArea = React.createClass({
  render: function(){

    return (
      <div>
        <h3>{this.props.title}</h3>
        <textarea value={this.props.state} name={this.props.name} onChange={this.props.onChange} rows={this.props.rows} cols={this.props.cols}></textarea>
      </div>
      );
  }
});

var CheckBox = React.createClass({
  render: function(){
    return (
      <input checked={this.props.state === "Y" ? true: false} name={this.props.name} value={this.props.name} onChange={this.props.onChange} type="checkbox" />
      )
  }
});

var RadioBtn = React.createClass({
  render: function(){
    // console.log("RDBTN state", this.props.state)
    // console.log("RDBTN val", this.props.val)
    // console.log("match", this.props.state == this.props.val ? "true" : "false" )
    return (
      <div>
        <input checked={this.props.state == this.props.val ? "true" : false} type="radio" name={this.props.name} value={this.props.val} onChange={this.props.onChange} />
        {this.props.data}
      </div>
      )
  }
})



var InputText = React.createClass({
  render: function(){
    //console.log("this.props.disabled", this.props.disabled)
    return (

      <div>
        <h3>{this.props.title}</h3>
        <input value={this.props.value} onChange={this.props.onChange} name={this.props.name} type="text" disabled={this.props.disabled}/>
      </div>
    )
  }
})

var Materials = React.createClass({
  render: function(){
    var self = this;
    return(
      <div>
        <h3>Materials</h3>
        {this.props.materials}
        <select value={this.props.state} name="material.description" onChange={this.props.onChange}>
          
          {this.props.materials.map(function(material){
            return <option value={material}>{material}</option>
          })}
        </select>
      </div>
    )
  }
})

var InputSpecs = React.createClass({
  render: function(){
    //console.log("this.props.shape", this.props.shape)
    return (
      <div>
        
      </div>
    )
  }
})

var Measurements = React.createClass({
  render: function(){
    //console.log("this.props.units.in", this.props.units)
    return (
      <div>
        <br />
        <b>Measurements</b>
        <div>
          <br />
          <span>Measurements are in: </span>
            <RadioBtn state={this.props.state.unit} val="in" onChange={this.props.onChange} data="Inches (in) " name="measurement.unit" />
            <RadioBtn state={this.props.state.unit }val="cm" onChange={this.props.onChange} data="Centimeters (cm)" name="measurement.unit"/>
        </div>
        <div eventCB={this.props.eventCB}>
          <span>Measured Item is: </span>
          
          <RadioBtn onChange={this.props.onChange} state={this.props.state.shape} val="rectangle" data="Rectangular " name="measurement.shape" />
          <RadioBtn onChange={this.props.onChange} state={this.props.state.shape} val="circle" data="Circular" name="measurement.shape"/>
        </div>
      </div>
      )
  }
})

var ShapeDetails = React.createClass({
  getInitialState: function(){
    return {
      shape: 'circle'
    }
  },
  handleChange: function(){
    //console.log("hit handler")
    this.props.onChange()
    this.setState({shape: event.target.value})
  },
  render: function(){
    //console.log("state shape", this.state.shape)
    return (
      <div>
       
        <Measurements state={this.props.state} onChange={this.handleChange} units={this.props.units} />
        <InputSpecs state={this.props.state} onChange={this.props.onChange} shape={this.state.shape} />
      </div>
      )
  }
})

var Condition = React.createClass({
  render: function(){
    var self=this
    return (
      <div>
        <h3>Condition</h3>

        {this.props.types.map(function(type, i){
          //console.log("type", type)
          return <RadioBtn state={self.props.state} onChange={self.props.onChange} val={type} data={type} key={i} name="condition.description" />
          {/*return <input type="radio" name="condition" value="type" key={i}>{type}</input>*/}
        })}
      </div>

    )
  }
})


React.render(
  <DibsForm />,
  document.getElementById('content')
);
