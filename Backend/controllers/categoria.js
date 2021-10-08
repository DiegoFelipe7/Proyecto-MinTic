const Categoria = require("../models/categoria");

exports.CreateCategoria = (request, response) => {
  const categoriaForAdd = new Categoria({
    nombre: request.body.nombre,
  });

  categoriaForAdd.save().then((categoriaCreated) => {
    response.status(201).json(categoriaCreated);
  });
};