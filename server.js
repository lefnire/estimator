var Sequelize = require('sequelize');
var sequelize = new Sequelize('lefnire', 'lefnire', '', { // database, username, password
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var User = sequelize.define('user', {
  firstName: {type: Sequelize.STRING},
  lastName: {type: Sequelize.STRING},
  email: {type: Sequelize.STRING}
});

var Task= sequelize.define('task', {
  //id: when autocompleting text, if a match is found use the StickyTask's _id instead of generating one
  text: {type:Sequelize.STRING},
  notes: {type:Sequelize.TEXT},
  hours: {type:Sequelize.FLOAT},
  estimate: {type:Sequelize.FLOAT},
  // _user, _parent
}, {
  //indexes: [{unique: true, fields: ['_user', '_parent']}]
});
// Task.onSave() => separate thread, if db.tasks.count({name:this.name})>5, new StickyTask

var StickyTask = sequelize.define('stickyTask', {
  text: {type:Sequelize.STRING}, // sticky a task when `count(Tasks, {text:"..."})>5`
  hours: {type:Sequelize.FLOAT}, // average of all hours, updated on clock-out or cron
  estimate: {type:Sequelize.FLOAT}, // average of all estimates
  //_parent (see _id in Task, normalized when adding a task)
});

var Tag = sequelize.define('tag', {
  //id: when autocompleting text, if a match is found use the StickyTask's _id instead of generating one
  text: {type:Sequelize.STRING},
  // _user, _task
}, {
  //indexes: [{unique: true, fields: ['_user', '_task']}]
});

var StickyTag = sequelize.define('stickyTag', {
  text: {type:Sequelize.STRING},
  //_task
});

User.hasMany(Task);
Task.hasMany(Task);
StickyTask.hasMany(StickyTask);
Task.hasMany(Tag);
StickyTask.hasMany(StickyTag);

sequelize.sync({force: true}).then(function () {
  // Table created
  User.create({firstName: 'Tyler', lastName: 'Renelle'}).then(function(user){
    Task.create({text:"Test"}).then(function(task){
      user.addTask(task).then(function(){
        User.findOne({include:[Task], raw:true}).then(function(user){
          console.log(user);
        })
      });
    })
  });
});