const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

//rotas dos user comuns 

//cria a nova task
router.post("/create", taskController.createTask);

//listagem de task por id
router.get("/list/:userId", taskController.listTasksByUser);

//marcar como concluida
router.patch("/complete/:taskId", taskController.completeTask);


//rotas do adm

//ver todas as tasks
router.get("/admin/all", taskController.listAllTasks);

//aprovar task
router.patch("/admin/aprovar/:taskId", taskController.aprovarTarefa);

//ver ranking
router.get("/admin/ranking", taskController.getRanking);

module.exports = router;

