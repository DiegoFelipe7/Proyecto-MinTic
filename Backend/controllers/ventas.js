const Venta=require("../models/ventas");
//metodo para listar productos
exports.getVentas = (req, res) => {
    Venta.find().then((productResult) => {
      res.status(200).json(productResult)
    })
    //res.status(200).json("Hola a todos");
};
//creamos la instancia tipo producto
exports.addVenta=(req, res) => {
  const productoAdd =new Venta({
    nombreCliente:req.body.nombreCliente,
    producto:req.body.producto,
    cantidad:req.body.cantidad,
    nombreVendedor:req.body.nombreVendedor,
    total:req.body.total
  })
  //metodo para guardar productos
  productoAdd.save().then((createdProduc)=>{
    console.log(createdProduc)
    res.status(201).json("Creado exitosamente");
  });
}
exports.getVentaId=(req, res)=>{
    Venta.findById(req.params.id).then((productResult)=>{
    if(productResult){
      res.status(200).json(productResult);
    }else{
      res.status(404).json("producto no encontrado")
    }
  })
}
//metodo para filtrar productos por una propiedad especifica
exports.getVentaDisponible=(req, res) => {
  Venta.find({disponible:true}).then((productoResult) => {
    res.status(200).json(productoResult);
  });
}