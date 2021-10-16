const Producto=require("../models/products");

//metodo para listar productos
exports.getProducts = (req, res) => {
    Producto.find()
    .populate("categoria")
    .then((productResult) => {
      res.status(200).json(productResult)
    })
};
//creamos la instancia tipo producto
exports.addProduct=(req, res) => {
  const productoAdd =new Producto({
    nombre_producto:req.body.nombre_producto,
    precio_unitario:req.body.precio_unitario,
    cantidad_producto:req.body.cantidad_producto,
    descripcion:req.body.descripcion,
    disponible:req.body.disponible,
    imagen:req.body.imagen,
    categoria:req.body.categoria
  })
  //metodo para guardar productos
  productoAdd.save()
    .then((createdProduc)=>{
      if(createdProduc){
        return res.status(201).json(true);
      }else{
        return res.status(404).json(false);
      }
    });
};
exports.getProductId=(req, res)=>{
  Producto.findById(req.params.id).then((productResult)=>{
    if(productResult){
      res.status(200).json(productResult);
    }else{
      res.status(404).json("producto no encontrado");
    }
  })
};
exports.getProductIdLazyLoading = (req, res) => {
  Producto.findById(req.params.id)
    .populate("categoria")
    .then((productoResult) => {
      if (productoResult) {
        res.status(200).json(productoResult);
      } else {
        res.status(404).json("Producto no encontrado");
      }
    });
};
//metodo para filtrar productos por una propiedad especifica
exports.getProductoDisponible=(req, res) => {
  Producto.find({disponible:true}).then((productoResult) => {
    res.status(200).json(productoResult);
  });
};

//método eliminar
exports.deleteProduct = (req, res) => {
  const id = req.params.id;

  Producto.deleteOne({ _id: id }).then((productoResult) => {
    if(productoResult.deletedCount === 1){
      return res.status(200).json(true);
    }
  });
};

//método actualizar
exports.editProduct = (req, res) => {

  const productoUpd = new Producto({
    _id: req.body._id,
    nombre_producto: req.body.nombre_producto,
    descripcion: req.body.descripcion,
    precio_unitario: req.body.precio_unitario,
    cantidad_producto: req.body.cantidad_producto,
    imagen: req.body.imagen,
    categoria: req.body.categoria,
    disponible: req.body.disponible,
  });

  Producto.findByIdAndUpdate(req.body._id, productoUpd).then((productoResult) => {
    if (productoResult) {
      res.status(200).json(true);
    } else {
      res.status(404).json(false);
    }
  });
};