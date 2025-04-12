const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

//criar task 
router.post('/create', taskController.createTask);

//lista de tasks por user
router.get('/list/:userId', taskController.listTasksByStatus);

//concluir tarefa
router.patch('/complete/:taskId', taskController.completeTask);

module.exports = router;
