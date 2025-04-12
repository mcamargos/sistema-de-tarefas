const { DataTypes } = require('sequelize'); //str, int...
const sequelize = require('../db/database'); //conexão db 

// modelo usuário 
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false // nome é obrigatório
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // o email não pode se repetir
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false // senha é obrigatória
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user' // pode ser user ou master (adm)
  },
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 0 // começa com 0 pontos
  },
  level: {
    type: DataTypes.INTEGER,
    defaultValue: 1 // começa no nível 1
  }
});

module.exports = User;