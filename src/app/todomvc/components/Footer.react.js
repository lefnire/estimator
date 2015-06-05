var React = require('react');
var {PropTypes} = React;
var TodoActions = require('../actions/TodoActions');
_ = require('lodash');

var Footer = React.createClass({

  propTypes: {
    allTodos: PropTypes.object.isRequired
  },

  /**
   * @return {object}
   */
  render() {
    var allTodos = this.props.allTodos;
    var total = _.size(allTodos);

    if (total === 0) {
      return null;
    }

    var completed = _.filter(allTodos, {complete:true}).length;

    var itemsLeft = total - completed;
    var itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
    itemsLeftPhrase += 'left';

    // Undefined and thus not rendered if no completed items are left.
    var clearCompletedButton;
    if (completed) {
      clearCompletedButton =
        <button
          id="clear-completed"
          onClick={this._onClearCompletedClick}>
          Clear completed ({completed})
        </button>;
    }

  	return (
      <footer id="footer">
        <span id="todo-count">
          <strong>
            {itemsLeft}
          </strong>
          {itemsLeftPhrase}
        </span>
        {clearCompletedButton}
      </footer>
    );
  },

  _onClearCompletedClick() {
    TodoActions.destroyCompleted();
  }

});

module.exports = Footer;
