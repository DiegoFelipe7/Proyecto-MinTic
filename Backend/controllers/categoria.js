const Categoria = require("../models/categoria");

exports.CreateCategoria = (request, response) => {
  const categoriaForAdd = new Categoria({
    nombre_categoria: request.body.nombre_categoria,
  });

  categoriaForAdd.save().then((categoriaCreated) => {
    response.status(201).json(categoriaCreated);
  });
};
exports.getCategorias = (req, res) => {
  Categoria.find().then((categorias) => {
    res.status(200).json(categorias)
  })
};
exports.getCategoriaId=(req, res)=>{
  Categoria.findById(req.params.id).then((categoriaResult)=>{
    if(categoriaResult){
      res.status(200).json(categoriaResult);
    }else{
      res.status(404).json("Categoriao no encontrado")
    }
  })
}