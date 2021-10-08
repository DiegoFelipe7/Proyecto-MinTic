const mongoose= require('mongoose');
//modelo
const venta=mongoose.Schema({
    nombreCliente:{type: String, required: true},
    producto:{type: String, required: true},
    vendedor:{type: String, required: true}

})
//exportamos el modelo
module.exports=mongoose.model("ventas", venta);