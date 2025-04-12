const express = require('express');          //criar servidor web
const cors = require('cors');                //acesso do frontend
const bodyParser = require('body-parser');   //entendendo o json
require('dotenv').config();                  //trazendo rotas

const app = express();

//permissão para o frontend e etc
app.use(cors());

//permissão de envio de dados em json
app.use(bodyParser.json());

//importando rotas do usuário
const userRoutes = require('./routes/userRoutes');

//importando task
const taskRoutes = require('./routes/taskRoutes');


//padronizão do caminho do usuário
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes); // caminho task


//porta que vai rodar
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
