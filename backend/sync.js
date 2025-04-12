const sequelize = require('./db/database'); //conexão com o db
const User = require('./models/User'); // importando modelo usuário
const Task = require('./models/Task'); // model de task

// criar as tabelas conforme o modelo 
sequelize.sync({ force: false })
  .then(() => {
    console.log('Banco de dados sincronizado, tudo certo!');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o db:', err);
  });
