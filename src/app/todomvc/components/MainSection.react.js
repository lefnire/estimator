var React = require('react');
var {PropTypes} = React;
var TodoActions = require('../actions/TodoActions');
var TodoItem = require('./TodoItem.react');
var _ = require('lodash');

var MainSection = React.createClass({

  propTypes: {
    allTodos: PropTypes.object.isRequired,
    areAllComplete: PropTypes.bool.isRequired
  },

  /**
   * @return {object}
   */
  render() {
    // This section should be hidden by default
    // and shown when there are todos.
    if (_.size(this.props.allTodos) < 1) {
      return null;
    }

    var allTodos = this.props.allTodos;
    var todos = [];

    _.each(allTodos, (v,k)=>{
      todos.push(<TodoItem key={k} todo={v} />);
    })

    return (
      <section id="main">
        <input
          id="toggle-all"
          type="checkbox"
          onChange={this._onToggleCompleteAll}
          checked={this.props.areAllComplete ? 'checked' : ''}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul id="todo-list">{todos}</ul>
      </section>
    );
  },

  _onToggleCompleteAll() {
    TodoActions.toggleCompleteAll();
  }

});

module.exports = MainSection;
