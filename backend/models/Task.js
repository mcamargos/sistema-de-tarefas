const { DataTypes } = require('sequelize');       //importa os dados do sequelize 
const sequelize = require('../db/database');      //instancia de conexão com o db

const Task = sequelize.define('Task', {           //define o modelo da task
  title: {
    type: DataTypes.STRING,      //titulo obrigatorio
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,        //descrição opcional
    allowNull: true
  },
  dueDate: {
    type: DataTypes.DATEONLY,    //data obrigatoria 
    allowNull: false
  },
  priority: {
    type: DataTypes.ENUM('baixa', 'media', 'alta'),   //prioridade da task
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pendente', 'concluida', 'atrasada'),   //status da task
    defaultValue: 'pendente'
  }
});

module.exports = Task;
