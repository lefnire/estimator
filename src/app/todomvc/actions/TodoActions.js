var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');

var TodoActions = {

  create(text) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_CREATE,
      text: text
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

  toggleCompleteAll() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL
    });
  },

  destroy(todo) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_DESTROY,
      todo: todo
    });
  },

  destroyCompleted() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_DESTROY_COMPLETED
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
