const { DataTypes } = require('sequelize'); //string, int...
const sequelize = require('../db/database'); //conexão db 

// modelo usuário 
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false         // nome obrigatório
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true            // o email não pode ser repetido
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false        // senha obrigatória
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user'    // pode ser user ou master (adm)
  },
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 0        // começo com 0 pontos
  },
  level: {
    type: DataTypes.INTEGER,
    defaultValue: 1       // começo no nível 1
  },
});

module.exports = User;