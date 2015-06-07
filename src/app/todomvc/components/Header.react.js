var React = require('react');
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react');

var Header = React.createClass({

  /**
   * @return {object}
   */
  render() {
    return (
      <header id="header">
        <TodoTextInput
          id="new-todo"
          placeholder="Add Todo"
          onSave={this._onSave}
          isAddInput={true}
        />
      </header>
    );
  },

  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  _onSave(text) {
    if (text.trim()){
      TodoActions.create(text);
    }

  }

});

module.exports = Header;
