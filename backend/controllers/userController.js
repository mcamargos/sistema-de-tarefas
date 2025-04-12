const User = require('../models/User'); //modelo de usuário
const bcrypt = require('bcryptjs');     //criptografar a senha
const jwt = require('jsonwebtoken');    //gerar o token
require('dotenv').config();             //acessar o SECRET_KEY do .env

//modelo usuário
exports.register = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
  
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email já cadastrado.' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role
      });
  
      res.status(201).json({ message: 'Cadastro concluido!', user });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
    }
  };
  
//modelo login 
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Email ou senha inválidos.' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Email ou senha inválidos.' });
      }
  
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
      );
  
      res.status(200).json({ message: 'Login realizado com sucesso!', token, user });
  
    } catch (error) {
      console.error(error); //mostra o erro
      res.status(500).json({ error: 'Erro ao realizar login.' });
    }
  };
  
