const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//registro do user
router.post("/register", userController.register);

//login
router.post("/login", userController.login);

//visualizar perfil
router.get("/profile/:userId", userController.getProfile);

//atualizar dados 
router.put("/update/:id", userController.updateUser);

module.exports = router;
