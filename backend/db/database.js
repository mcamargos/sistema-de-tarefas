const { Sequelize } = require('sequelize'); //importação da biblioteca e carregamento de variáveis

//conexão com db 
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './backend/db/database.sqlite' //local de salvamento
});

//teste de conexão com o db
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados OK!');
  } catch (error) {
    console.error('Erro ao conectar:', error);
  }
}

testConnection();

module.exports = sequelize;
