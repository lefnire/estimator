var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');

var TodoActions = {

  create(prev, text) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_CREATE,
      text: text,
      prev: prev
    });
  },

  updateText(todo, text) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_UPDATE_TEXT,
      todo: todo,
      text: text
    });
  },

  toggleComplete(todo) {
    var actionType = todo.complete ?
        TodoConstants.TODO_UNDO_COMPLETE :
        TodoConstants.TODO_COMPLETE;

    AppDispatcher.dispatch({
      actionType: actionType,
      id: todo
    });
  },

  destroy(todo) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_DESTROY,
      todo: todo
    });
  },

  indent(todo) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_INDENT,
      todo: todo
    });
  },

  outdent(todo) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_OUTDENT,
      todo: todo
    });
  },

};

module.exports = TodoActions;
