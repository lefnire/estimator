var React = require('react');
var {PropTypes} = React;
var TodoActions = require('../actions/TodoActions');
var TodoItem = require('./TodoItem.react');
var _ = require('lodash');

module.exports = React.createClass({

  propTypes: {
    allTodos: PropTypes.object.isRequired,
  },

  render() {
    // This section should be hidden by default and shown when there are todos.
    //if (_.size(this.props.allTodos) < 1) return null;

    return (
      <section id="main" className='container-fluid'>
        <ul id="todo-list" className='list-unstyled'>
          <TodoItem key='all-todos' todo={this.props.allTodos.child} />
        </ul>
      </section>
    );
  }
});
