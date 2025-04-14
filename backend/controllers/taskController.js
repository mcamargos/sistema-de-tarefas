const { Task, User } = require("../models");    //importando o task e user do sequelize 

//criação das tarefas
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, userId } = req.body; //extrai os dados

    const tarefa = await Task.create({       //cria a task associada ao user
      title,
      description,
      dueDate,
      priority,
      UserId: userId,     //aonde o relacionamento acontece
    });

    res.status(201).json({ message: "Tarefa criada com sucesso!", tarefa });   //resposta com sucesso ou não
  } catch (err) {                                       
    console.error(err);
    res.status(500).json({ error: "Erro ao criar sua tarefa." });
  }
};

//lista de tarefas do usuário
exports.listTasksByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const tarefas = await Task.findAll({      //busca todas tarefas ordenadas por data
      where: { UserId: userId },
      order: [["dueDate", "ASC"]],
    });

    res.status(200).json({ tarefas });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar suas tarefas." });
  }
};

//marcar tarefa como concluída e aguardar a aprovação 
exports.completeTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByPk(taskId);  //busca a tarefa pelo id

    if (!task || task.status === "concluida" || task.status === "aprovada") {     //verifica se a task existe e nao finalizou
      return res.status(400).json({ error: "Tarefa inválida ou já finalizada." });
    }

    task.status = "concluida";  //atualiza o status
    await task.save();

    res.status(200).json({ message: "Tarefa marcada como concluída. Aguarde a aprovação." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao concluir sua tarefa." });
  }
};

//adm: listar todas as tarefas
exports.listAllTasks = async (req, res) => {
  try {
    const tarefas = await Task.findAll({      //buscar todas as tasks 
      include: {
        model: User,
        attributes: ["name", "email", "role"],
      },
      order: [["dueDate", "ASC"]],
    });

    res.status(200).json({ tarefas });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar tarefas." });
  }
};

//adm: aprovar tarefa e distribuir os pontos
exports.aprovarTarefa = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByPk(taskId);      //buscar tarefa
    if (!task || task.status !== "concluida") {
      return res.status(400).json({ error: "Tarefa inválida ou não está pronta para aprovação." });
    }

    const user = await User.findByPk(task.UserId);    //busca o dono da task
    if (!user) return res.status(404).json({ error: "Usuário não encontrado." });

    let pontos = 0;                                 //definição de pontuação
    if (task.priority === "baixa") pontos = 10;
    else if (task.priority === "media") pontos = 20;
    else if (task.priority === "alta") pontos = 30;

    user.points += pontos;                             //atualiza os pontos e o level
    user.level = Math.floor(user.points / 100) + 1;   

    await user.save();

    task.status = "aprovada";    //atualiza o status para aprovada
    await task.save();

    res.status(200).json({          //retorna os dados atualizados
      message: "Tarefa aprovada!",
      pontosGanhos: pontos,
      novoNivel: user.level,
      pontosTotais: user.points,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao aprovar tarefa." });
  }
};

//adm: visualizar ranking
exports.getRanking = async (req, res) => {
  try {
    const usuarios = await User.findAll({                     //busca todos ordenados pela pontuação
      attributes: ["id", "name", "points", "level", "role"],
      order: [["points", "DESC"]],
    });

    res.status(200).json({ usuarios });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar ranking." });
  }
};
