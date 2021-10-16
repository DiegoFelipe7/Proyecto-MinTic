const Venta=require("../models/ventas");
//metodo para listar ventas
exports.getVentas = (req, res) => {
    Venta.find()
    .populate("producto")
    .populate("nombreVendedor")
    .then((productResult) => {
      res.status(200).json(productResult)
    })
};
//creamos la instancia tipo producto
exports.addVenta=(req, res) => {
  const ventaAdd =new Venta({
    nombreCliente:req.body.nombreCliente,
    producto:req.body.producto,
    cantidad:req.body.cantidad,
    documento:req.body.documento,
    nombreVendedor:req.body.nombreVendedor,
    total:req.body.total
  })
  //metodo para guardar ventas
  ventaAdd.save().then((createdVent)=>{
    res.status(201).json(true);
  });
}
//Buscar pod id
exports.getVentaId=(req, res)=>{
    Venta.findById(req.params.id).then((ventaResult)=>{
    if(ventaResult){
      res.status(200).json(ventaResult);
    }else{
      res.status(404).json("Venta no encontrada")
    }
  })
}
//metodo para filtrar ventas por una propiedad especifica
exports.getVentaDisponible=(req, res) => {
  Venta.find({disponible:true}).then((ventaResult) => {
    res.status(200).json(ventaResult);
  });
}
//método eliminar
exports.deleteVenta = (req, res) => {
  const id = req.params.id;

  Venta.deleteOne({ _id: id }).then((ventaResult) => {
    res.status(200).json("La venta se eliminó satisfactoriamente.");
  });
};

//método actualizar
exports.editVenta = (req, res) => {

  const ventaUpd = new Venta({
    _id: req.body._id,
    nombreCliente: req.body.nombreCliente,
    producto: req.body.producto,
    cantidad: req.body.cantidad,
    documento:req.body.documento,
    nombreVendedor: req.body.nombreVendedor,
    total: req.body.total,
  });

  Venta.findByIdAndUpdate(req.body._id, ventaUpd).then((ventaResult) => {
    if (ventaResult) {
      res.status(200).json(ventaResult);
    } else {
      res.status(404).json("Venta no encontrado");
    }
  });
};