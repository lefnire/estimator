var React = require('react');
var {PropTypes} = React;
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react');
var _ = require('lodash');

var cx = require('react/lib/cx');

var TodoItem = React.createClass({

  propTypes: {
   todo: PropTypes.object.isRequired
  },

  /**
   * @return {object}
   */
  render() {
    var todo = this.props.todo;

    var children;
    if (!_.isEmpty(todo.children)) {
      children = _.map(todo.children, (v=>
        (<TodoItem todo={v} />)
      ));
      children = (<ul>{children}</ul>);
    }

    // List items should get the class 'editing' when editing
    // and 'completed' when marked as completed.
    // Note that 'completed' is a classification while 'complete' is a state.
    // This differentiation between classification and state becomes important
    // in the naming of view actions toggleComplete() vs. destroyCompleted().
    return (
      <li key={todo.id} className="row">
        <div className="col-lg-6">
          <div className="input-group">
            <span className="input-group-addon">
              <input type="checkbox" checked={todo.complete} onChange={this._onToggleComplete} />
            </span>
            <TodoTextInput
              onSave={this._onSave}
              value={todo.text}
              todo={todo}
              className='form-control'
              />
          </div>
        </div>

        <button className="btn btn-small" onClick={this._onDestroyClick}>x</button>
        {children}
      </li>
    );
  },

  _onToggleComplete() {
    TodoActions.toggleComplete(this.props.todo);
  },

  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param  {string} text
   */
  _onSave(text) {
    TodoActions.updateText(this.props.todo, text);
  },

  _onDestroyClick() {
    TodoActions.destroy(this.props.todo);
  }

});

module.exports = TodoItem;
