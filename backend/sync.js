const sequelize = require('./db/database');
const { User, Task } = require('./models'); //importa os modelos com relacionamento

sequelize.sync({ force: true }) //recriação das tabelas 
  .then(() => {
    console.log('Banco de dados sincronizado, tudo certo!');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o db:', err);
  });
