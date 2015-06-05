var AppDispatcher = require('../dispatcher/AppDispatcher');
var {EventEmitter} = require('events');
var TodoConstants = require('../constants/TodoConstants');
var _ = require('lodash');
var uuid = require('node-uuid');

var CHANGE_EVENT = 'change';

var _todos = {
  children:{}
};

function create(text) {
  var id = uuid.v4();
  _todos.children[id] = {
    id: id,
    complete: false,
    text: text,
    parent: _todos,
    children: {},
    sort: ( _.isEmpty(_todos.children) ? 0 : _.max(_todos.children, 'sort').sort)+1
  };
  console.dir(_todos);
}

function update(todo, updates) {
  todo.parent.children[todo.id] = _.assign({}, todo, updates);
}

function updateAll(updates) {
  //fixme
  //_.each(_todos, (v,k)=>update(k,updates));
}

function destroy(todo) {
  delete todo.parent.children[todo.id];
}

function destroyCompleted() {
  //fixme
  //_.each(_todos, (v,k)=>{v.complete && destroy(k)});
}

function indent(todo) {
  var sorted = _.sortBy(todo.parent.children, 'sort');
  if (sorted.length===1) return; // can't indent any further
  var prev = todo.parent.children[ sorted[_.findIndex(sorted,{id:todo.id})-1].id ];
  delete todo.parent.children[todo.id];
  todo.parent = prev;
  prev.children[todo.id] = todo;
}
function outdent(todo) {
  var grandpa = todo.parent.parent;
  if (!grandpa) return; // top level
  delete todo.parent.children[todo.id];
  todo.parent = grandpa;
  grandpa.children[todo.id] = todo;
}

var TodoStore = _.assign({}, EventEmitter.prototype, {

  areAllComplete() {
    return _.every(_todos.children, {complete:true});
  },

  getAll() {
    return _todos.children;
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
      text = action.text.trim();
      if (text !== '') {
        create(text);
        TodoStore.emitChange();
      }
      break;

    case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
      if (TodoStore.areAllComplete()) {
        updateAll({complete: false});
      } else {
        updateAll({complete: true});
      }
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

    case TodoConstants.TODO_DESTROY_COMPLETED:
      destroyCompleted();
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
