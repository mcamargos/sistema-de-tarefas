const Task = require('../models/Task');
const User = require('../models/User');

//cria a nova tarefa
exports.createTask = async (req, res) => {
  try {
    const { userId, title, description, dueDate, priority } = req.body;

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      UserId: userId
    });

    res.status(201).json({ message: 'Tarefa criada com sucesso!', task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar sua tarefa.' });
  }
};

//lista de tarefas por status
exports.listTasksByStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const tasks = await Task.findAll({ where: { UserId: userId } });

    const hoje = new Date();

    const tarefasFormatadas = tasks.map((task) => {
      let status = task.status;

      if (status === 'pendente' && new Date(task.dueDate) < hoje) {
        status = 'atrasada';
        task.status = 'atrasada';
        task.save(); //atualiza no db
      }

      return { ...task.toJSON(), status };
    });

    res.status(200).json({ tarefas: tarefasFormatadas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar suas tarefas.' });
  }
};

//conclui a task e dá os pontos
exports.completeTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByPk(taskId);
    if (!task || task.status === 'concluida') {
      return res.status(400).json({ error: 'Tarefa inválida ou já concluída.' });
    }

    task.status = 'concluida';
    await task.save();

    const user = await User.findByPk(task.UserId);
    let pontos = 0;

    if (task.priority === 'baixa') pontos = 10;
    else if (task.priority === 'media') pontos = 20;
    else if (task.priority === 'alta') pontos = 30;

    user.points += pontos;
    user.level = Math.floor(user.points / 100) + 1;

    await user.save();

    res.status(200).json({
      message: 'Tarefa concluída com sucesso! Pontos adicionados.',
      pontosGanhos: pontos,
      novoNivel: user.level,
      pontosTotais: user.points
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao concluir sua tarefa.' });
  }
};
