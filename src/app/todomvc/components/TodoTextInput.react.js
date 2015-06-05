var React = require('react');
var {PropTypes} = React;
var TodoActions = require('../actions/TodoActions');
var {HotKeys} = require('react-hotkeys');

const keyMap = {
  'indent': 'tab',
  'outdent': 'shift+tab',
  'save': 'enter'
};
var TodoTextInput = React.createClass({

  propTypes: {
    className: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    value: PropTypes.string
  },

  getInitialState() {
    return {
      value: this.props.value || ''
    };
  },

  /**
   * @return {object}
   */
  render() {
    const handlers = {
      'indent': this._indent,
      'outdent': this._outdent,
      'enter': this._save
    };
    return (
      <HotKeys keyMap={keyMap} handlers={handlers}>
        <input
          className={this.props.className}
          id={this.props.id}
          placeholder={this.props.placeholder}
          onBlur={this._save}
          onChange={this._onChange}
          value={this.state.value}
          autoFocus={true}
        />
      </HotKeys>
    );
  },

  /**
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways.
   */
  _save() {
    this.props.onSave(this.state.value);
    this.setState({
      value: ''
    });
  },

  _onChange(event) {
    this.setState({
      value: event.target.value
    });
  },

  _indent(evt){
    evt.preventDefault();
    TodoActions.indent(this.props.todo);

  },
  _outdent(evt){
    evt.preventDefault();
    TodoActions.outdent(this.props.todo);
  }
});

module.exports = TodoTextInput;
