const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');
const User = require('./User'); //task pertence a um user

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  dueDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  priority: {
    type: DataTypes.ENUM('baixa', 'media', 'alta'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pendente', 'concluida', 'atrasada'),
    defaultValue: 'pendente'
  }
});

//a tarefa pertence a apenas usuário
Task.belongsTo(User);
User.hasMany(Task);

module.exports = Task;
