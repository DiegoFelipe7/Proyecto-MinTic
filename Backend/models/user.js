const mongoose = require("mongoose");
const usuario=mongoose.Schema({
    nombre_usu:{type: String, required: false},
    apellido_usu:{type:String ,required:false},
    tipo_documento_usu:{type:String ,required:false},
    identificacion_usu:{type:Number ,required:false},
    email_usu:{type:String ,required:true},
    activo:{type:Boolean ,required:true},
    rol_usu:{type:String ,required:false}
    
})
//exportamos el modelo
module.exports=mongoose.model("usuarios",usuario)