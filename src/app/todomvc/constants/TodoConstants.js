module.exports = require('lodash').reduce([
  "TODO_CREATE",
  "TODO_COMPLETE",
  "TODO_DESTROY",
  "TODO_DESTROY_COMPLETED",
  "TODO_TOGGLE_COMPLETE_ALL",
  "TODO_UNDO_COMPLETE",
  "TODO_UPDATE_TEXT",
  "TODO_INDENT",
  "TODO_OUTDENT"
], (m,v)=>{m[v]=v;return m}, {});
