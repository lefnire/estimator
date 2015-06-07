'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var {EventEmitter} = require('events');
var TodoConstants = require('../constants/TodoConstants');
var _ = require('lodash');
var uuid = require('node-uuid');

var CHANGE_EVENT = 'change';

var _todos = {};
_todos.child = create(undefined, ''); // start with a blank task

function create(prev, text) {
  var task = {
    id: uuid.v4(),
    complete: false,
    text: text,

    prev: prev,
    next: prev && prev.next,
    parent: prev ? prev.parent : _todos,
    child: undefined, // a pointer to the first child in a linked list
  };
  if (prev) prev.next = task;
  return task;
}

function update(todo, updates) {
  _.merge(todo, updates);
}

function destroy(todo) {
  //fixme handle first entry
  _splice(todo);
}

function _splice(todo) {
  var {next, prev, parent} = todo;
  if (prev) prev.next = next;
  if (next) next.prev = prev;
  if (parent.child === todo) parent.child = next;
}
function _insertAfter(prev, todo){
  if (!prev) return;
  var next = prev.next;
  prev.next = todo;
  if (next) next.prev = todo;
  todo.next = next;
  todo.prev = prev;
}

function indent(todo) {
  if (!todo.prev) return; // first item
  _splice(todo);
  var newParent = todo.prev;
  if (newParent.child) {
    let last = newParent.child;
    while (last.next)
      last = last.next;
    _insertAfter(last, todo);
  } else {
    newParent.child = todo;
    todo.parent = newParent;
    todo.prev = todo.next = undefined;
  }
}

function outdent(todo) {
  if (todo.parent === _todos) return; // top-level
  _splice(todo);
  _insertAfter(todo.parent, todo);
  if (todo.parent.child == todo) todo.parent.child = undefined;
  todo.parent = parent.parent;
}

var TodoStore = _.assign({}, EventEmitter.prototype, {

  getAll() {
    return _todos;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case TodoConstants.TODO_CREATE:
      text = (action.text || '').trim();
      create(action.prev, text);
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UNDO_COMPLETE:
      update(action.todo, {complete: false});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_COMPLETE:
      update(action.todo, {complete: true});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        update(action.todo, {text: text});
        TodoStore.emitChange();
      }
      break;

    case TodoConstants.TODO_DESTROY:
      destroy(action.todo);
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_INDENT:
      indent(action.todo);
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_OUTDENT:
      outdent(action.todo);
      TodoStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = TodoStore;
