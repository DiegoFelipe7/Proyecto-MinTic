const mongoose = require('mongoose');

const categoriaSchema= mongoose.Schema({
    nombre_categoria: {type:String, required: true}
});
module.exports=mongoose.model("categoria", categoriaSchema);