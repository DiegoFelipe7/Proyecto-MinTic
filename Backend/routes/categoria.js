const express = require("express");
const router = express.Router();

const CategoriaController = require("../controllers/categoria");

router.post("", CategoriaController.CreateCategoria);
router.get("", CategoriaController.getCategorias);
router.get("/:id", CategoriaController.getCategoriaId);
module.exports = router;