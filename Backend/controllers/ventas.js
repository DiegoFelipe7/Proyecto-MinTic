const Venta=require("../models/ventas");
//metodo para listar productos
exports.getVentas = (req, res) => {
    Venta.find().then((ventaResult) => {
      res.status(200).json(ventaResult)
    })
    //res.status(200).json("Hola a todos");
};
//creamos la instancia tipo producto
exports.addVenta=(req, res) => {
  const ventaAdd =new Venta({
    nombreCliente:req.body.nombreCliente,
    producto:req.body.producto,
    cantidad:req.body.cantidad,
    nombreVendedor:req.body.nombreVendedor,
    total:req.body.total
  })
  //metodo para guardar productos
  ventaAdd.save().then((createdVent)=>{
    console.log(createdVent)
    res.status(201).json("Creado exitosamente");
  });
}
exports.getVentaId=(req, res)=>{
    Venta.findById(req.params.id).then((ventaResult)=>{
    if(ventaResult){
      res.status(200).json(ventaResult);
    }else{
      res.status(404).json("Venta no encontrada")
    }
  })
}
//metodo para filtrar productos por una propiedad especifica
exports.getVentaDisponible=(req, res) => {
  Venta.find({disponible:true}).then((ventaResult) => {
    res.status(200).json(ventaResult);
  });
}
exports.deleteVenta=(req, res) => {
  const id=req.params.id;
  console.log(id);
  Venta.deleteOne({ _id: id }).then((ventaResult) => {
    res.status(200).json("Venta eliminada");
  });
};

exports.editVenta = (req, res) => {
  const id = req.params.id;

  const ventaUpd = new Venta({
    _id: id,
    nombreCliente:req.body.nombreCliente,
    producto:req.body.producto,
    cantidad:req.body.cantidad,
    nombreVendedor:req.body.nombreVendedor,
    total:req.body.total
  });
  Venta.findByIdAndUpdate(id, ventaUpd).then((productoResult) => {
    res.status(200).json("La venta se actualizó satisfactoriamente");
  });
};