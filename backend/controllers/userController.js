const User = require("../models/User");   //importando model usuário
const bcrypt = require("bcryptjs");       //importar o bcrypt para criptografar senhas
const jwt = require("jsonwebtoken");      //importa JWT para gerar token de auten.
require("dotenv").config();               //carregar as variáveis de ambiente (secret_key)

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body; //recebe as infos do corpo da requisição
    const hash = await bcrypt.hash(password, 10);     //criptografa a senha
    const user = await User.create({                  //criação do usuário no db
      name,
      email,
      password: hash,
      role,
      points: 0,
      level: 1,
    });

    //gerando token JWT com o id e o cargo
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    //remove o campo password da resposta
    const { password: _, ...userSafe } = user.toJSON();

    // retorna os dados do usuário e o token 
    res.status(201).json({ message: "Cadastro concluído!", token, user: userSafe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao cadastrar usuário." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //procura pelo e-mail
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Email ou senha inválidos.' });

    //comparação das senhas crip. e a informada
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ error: 'Email ou senha inválidos.' });

    //gera o token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );

    //remove a senha 
    const { password: _, ...userSafe } = user.toJSON();

    //retorna os dados e o token 
    res.status(200).json({ message: 'Login realizado com sucesso!', token, user: userSafe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao realizar login.' });
  }
};
    
exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.params;   //extrai o id do user 
               
    const user = await User.findByPk(userId);  //busca o user pelo id
    if (!user) return res.status(404).json({ error: "Usuário não encontrado." });

    const { password, ...safeUser } = user.toJSON(); //remove senha retornada

    res.status(200).json({ user: safeUser });   //retorna os dados
  } catch (error) {
    console.error("Erro no getProfile:", error);
    res.status(500).json({ error: "Erro ao buscar perfil." });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;             
    const { name, email, role, password } = req.body;

    const user = await User.findByPk(id);        
    if (!user) return res.status(404).json({ error: "Usuário não encontrado." });  //busca de user pelo id

    user.name = name || user.name;
    user.email = email || user.email;      //atualiza ou mantém os dados alterados
    user.role = role || user.role;

    if (password && password.trim() !== "") {
      const hashed = await bcrypt.hash(password, 10);    //nova senha? criptografa e atualiza 
      user.password = hashed;
    }

    await user.save();

    //remove a senha
    const { password: _, ...safeUser } = user.toJSON();    
    res.status(200).json({ message: "Usuário atualizado com sucesso!", user: safeUser });  //remove a senha
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar usuário." });
  }
};