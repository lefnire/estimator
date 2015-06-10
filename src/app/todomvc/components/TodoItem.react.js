var React = require('react');
var {PropTypes} = React;
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react');
var _ = require('lodash');
var moment = require('moment');
var Timer = require('./Timer');

var TodoItem = React.createClass({

  propTypes: {
   todo: PropTypes.object.isRequired
  },

  render() {
    var todo = this.props.todo;
    var next = todo.next ? <TodoItem todo={todo.next} /> : null;
    var children = !todo.child ? null : (
      <ul className='list-unstyle'>
        <TodoItem todo={todo.child} />
      </ul>
    );

    return (
      <div>
        <li key={todo.id} className="row">
            <div className="input-group">
              <span className="input-group-addon">
                <input type="checkbox" checked={todo.complete} onChange={this._onToggleComplete} />
              </span>

              <TodoTextInput
                onSave={this._onSave}
                value={todo.text}
                todo={todo}
                className='form-control'
                autofocus={!todo.next}
                />

              <Timer todo={todo} />

              <div className="input-group-addon dropdown">
                <button type="button" id="dropdownMenu1" data-toggle="dropdown">
                  <span className="caret"></span>
                </button>
                <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                  <li role="presentation"><a role="menuitem" tabIndex="-1" onClick={this._onDestroyClick}>Delete</a></li>
                  <li role="presentation"><a role="menuitem" tabIndex="-1" href="#">Another action</a></li>
                </ul>
              </div>

            </div>
          {children}

        </li>
        {next}
      </div>
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
  },

});

module.exports = TodoItem;
