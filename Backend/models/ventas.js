const mongoose= require('mongoose');
//modelo
const venta=mongoose.Schema({
    nombreCliente:{type: String, required: true},
    producto:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,},
    cantidad:{type: Number, required: true},
    documento:{type: Number, required: true},
    nombreVendedor:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuarios",
        required: true,},
    total:{type: Number, required: true}
})

//exportamos el modelo
module.exports=mongoose.model("ventas", venta);