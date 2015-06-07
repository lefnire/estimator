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

  getInitialState() {
    return {
      isEditing: false
    };
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

    var input;
    if (this.state.isEditing) {
      input =
        <TodoTextInput
          className="edit"
          onSave={this._onSave}
          value={todo.text}
          todo={todo}
        />;
    }

    // List items should get the class 'editing' when editing
    // and 'completed' when marked as completed.
    // Note that 'completed' is a classification while 'complete' is a state.
    // This differentiation between classification and state becomes important
    // in the naming of view actions toggleComplete() vs. destroyCompleted().
    return (
      <li
        className={cx({
          'completed': todo.complete,
          'editing': this.state.isEditing
        })}
        key={todo.id}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.complete}
            onChange={this._onToggleComplete}
          />
          <label onDoubleClick={this._onDoubleClick}>
            {todo.text}
          </label>
          <button className="destroy" onClick={this._onDestroyClick}>x</button>
        </div>
        {input}
        {children}
      </li>
    );
  },

  _onToggleComplete() {
    TodoActions.toggleComplete(this.props.todo);
  },

  _onDoubleClick() {
    this.setState({isEditing: true});
  },

  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param  {string} text
   */
  _onSave(text) {
    TodoActions.updateText(this.props.todo, text);
    this.setState({isEditing: false});
  },

  _onDestroyClick() {
    TodoActions.destroy(this.props.todo);
  }

});

module.exports = TodoItem;
