const User = require("./User");
const Task = require("./Task");

//relacionamentos de um usuário tem muitas tarefas e quem pertence cada
User.hasMany(Task);
Task.belongsTo(User);


module.exports = {
  User,
  Task,
};
