var DibsForm = React.createClass({
  getInitialState: function(){
    return {
      material: [],
      measurement: {
        unit: {},
        shape: []
      },
      condition: {
        description: []
      }
    };
  },

  componentDidMount: function(){
    //fetch to get enumerables
    var self = this    
    fetch('json/enums.json').then(function(resp){
      return resp.json()
    }).then(function(data){
      self.setState(data.itemEnums)
      //console.log("self.state", self.state)
    })
  },
  render: function() {
    return (
      <form className="dibsForm">
       
        <h3>Title</h3>
        <input type="text" name="title"></input>
        <TextArea title="Description" rows="10" cols="50" />
        <TextArea title="Internal Notes" rows="3" cols="50" />
        <CheckBox /><b>Check this box</b> if the listing contains or may contain restricted material
        { /*console.log("this.state.measurement.unit", this.state.measurement.unit)*/}
        <ShapeDetails units={this.state.measurement.unit} />
      </form>
    );
  }
});



var TextArea = React.createClass({
  render: function(){
    return (
      <div>
        <h3>{this.props.title}</h3>
        <textarea rows={this.props.rows} cols={this.props.cols}></textarea>
      </div>
      );
  }
});

var CheckBox = React.createClass({
  render: function(){
    return (
      <input type="checkbox" />
      )
  }
});

var RadioBtn = React.createClass({
  render: function(){
    return <input type="radio" name={this.props.name}>{this.props.data}</input>
  }
})

var Measurements = React.createClass({
  render: function(){
    //console.log("this.props.units.in", this.props.units)
    return (
      <div eventCB={this.props.eventCB}>
        <br />
        <b>Measurements</b>
        <div>
          <br />
          <span>Measurements are in:</span>
            <RadioBtn data="Inches (in) " name="units" />
            <RadioBtn data="Centimeters (cm)" name="units"/>
        </div>
        <div eventCB={this.props.eventCB}>
          <span>Measured Item is:</span>
          <RadioBtn onClick={this.props.eventCB} data="Rectangular " name="shape" />
          <RadioBtn onClick={this.props.eventCB} data="Circular" name="shape"/>
        </div>
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
        <input type="text" disabled={this.props.disabled}/>
      </div>
    )
  }
})

var InputSpecs = React.createClass({
  render: function(){
    //console.log("this.props.shape", this.props.shape)
    return (
      <div>
        <div>
          <InputText title="Length" class="rectangle" disabled={this.props.shape == "rectangle" ? false : "disabled"} />
          <InputText title="Depth" class="rectangle" disabled={this.props.shape == "rectangle" ? false : "disabled"} />
        </div>
        <div>
          <InputText title="Height" class="rectangle" disabled={this.props.shape == "rectangle" ? false : "disabled"} />
          <InputText title="Diameter" class="circle" disabled={this.props.shape == "circle" ? false : "disabled"} />
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
  handleClick: function(){
    console.log("hit handler")
  },
  render: function(){
    console.log("state shape", this.state.shape)
    return (
      <div fn={this.handleClick}>
        <Measurements onClick={this.props.fn} units={this.props.units} />
        <InputSpecs  shape={this.state.shape} />
      </div>
      )
  }
})

React.render(
  <DibsForm />,
  document.getElementById('content')
);
