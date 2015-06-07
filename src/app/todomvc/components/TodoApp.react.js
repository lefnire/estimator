var Freelancer = require('./Freelancer.react');
var React = require('react');
var TodoStore = require('../stores/TodoStore');

function getTodoState() {
  return {
    allTodos: TodoStore.getAll(),
  };
}

var TodoApp = React.createClass({

  getInitialState() {
    return getTodoState();
  },

  componentDidMount() {
    TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    TodoStore.removeChangeListener(this._onChange);
  },

  render() {
  	return (
      <div>
        <Freelancer allTodos={this.state.allTodos} />
        {/*Customer*/}
      </div>
  	);
  },

  _onChange() {
    this.setState(getTodoState());
  }

});

module.exports = TodoApp;
