const mongoose = require("mongoose");
const usuario=mongoose.Schema({
    nombre_usu:{type: String, required: true},
    apellido_usu:{type:String ,required:true},
    tipo_documento_usu:{type:String ,required:true},
    identificacion_usu:{type:Number ,required:true},
    rol_usu:{type:String ,required:true}
    
})
//exportamos el modelo
module.exports=mongoose.model("usuarios",usuario)