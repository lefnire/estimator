module.exports = require('lodash').reduce([
  "TODO_CREATE",
  "TODO_COMPLETE",
  "TODO_DESTROY",
  "TODO_UNDO_COMPLETE",
  "TODO_UPDATE_TEXT",
  "TODO_INDENT",
  "TODO_OUTDENT",
  "TODO_CLOCK"
], (m,v)=>{m[v]=v;return m}, {});
