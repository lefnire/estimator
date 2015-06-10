var React = require('react');

module.exports = React.createClass({

  getInitialState: function(){
    return { elapsed: 0 };
  },

  componentDidMount: function(){
    //if (!this.props.todo.clocking) return;
    this.timer = setInterval(this.tick, 50);
  },

  componentWillUnmount: function(){

    // This method is called immediately before the component is removed
    // from the page and destroyed. We can clear the interval here:

    clearInterval(this.timer);
  },

  tick: function(){

    // This function is called every 50 ms. It updates the
    // elapsed counter. Calling setState causes the component to be re-rendered

    this.setState({elapsed: new Date() - this.props.todo.startTime});
  },

  render: function() {
    if (!this.props.todo.clocking) return null;

    var elapsed = Math.round(this.state.elapsed / 100);

    // This will give a number with one digit after the decimal dot (xx.x):
    var seconds = (elapsed / 10).toFixed(1);

    // Although we return an entire <p> element, react will smartly update
    // only the changed parts, which contain the seconds variable.

    return (<div className='input-group-addon'>
        {seconds}
    </div>);
  }
});