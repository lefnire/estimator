var React = require('react');
var {PropTypes} = React;
var TodoActions = require('../actions/TodoActions');
var {HotKeys} = require('react-hotkeys');

const keyMap = {
  'indent': 'tab',
  'outdent': 'shift+tab',
  'enter': 'enter',
  'clock': 'ctrl+c'
};
var TodoTextInput = React.createClass({

  propTypes: {
    className: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    value: PropTypes.string,
    autofocus: PropTypes.bool,
    todo: PropTypes.object.isRequired
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
      'enter': this._saveAndCreate,
      'clock': this._clock
    };
    return (
      <HotKeys keyMap={keyMap} handlers={handlers}>
        <input
          type="text"
          className={this.props.className}
          id={this.props.id}
          placeholder={this.props.placeholder}
          onBlur={this._save}
          onChange={this._onChange}
          value={this.state.value}
          autoFocus={!!this.props.autofocus}
        />
      </HotKeys>
    );
  },

  /**
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways.
   */
  _save() {
    // fixme it's calling blur & create at same time
    this.props.onSave(this.state.value);
  },

  _saveAndCreate() {
    this._save();
    TodoActions.create(this.props.todo, '');
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
  },
  _clock(evt){
    TodoActions.clock(this.props.todo);
  }
});

module.exports = TodoTextInput;
