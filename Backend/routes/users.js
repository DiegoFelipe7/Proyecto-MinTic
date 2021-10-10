const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users");
router.get("", UserController.getUsers);
router.post("", UserController.addUser);
router.get("/disponibles", UserController.getIdentificacion);
router.get("/:id", UserController.getUserId);
module.exports = router;