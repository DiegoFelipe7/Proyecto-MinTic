const Usuario= require("../models/user");
exports.getUsers = (req, res) => {
    Usuario.find().then((UserResult) => {
      res.status(200).json(UserResult)
    })
};
exports.getUser = (req, res) => {
  const email=req.params.email;
  Usuario.findOne({email_usu:email}).then((user) => {
    if(user){
      if(user.activo){
        res.status(200).json("Usuario activo")
      }else{
        res.status(500).json("Usuario inactivo")
      }      
    }else{
      const newUser=new Usuario({
        nombre_usu:req.userData.name,
        email_usu:req.userData.email,
        activo:false,
      });
      newUser.save().then((user)=>{
        res.status(200).json("Usuario creado");
      })
    }
    //res.status(200).json(user)
  })
};
exports.addUser=(req,res)=>{
    const userAdd = new Usuario({
        nombre_usu:req.body.nombre_usu,
        apellido_usu:req.body.apellido_usu,
        tipo_documento_usu:req.body.tipo_documento_usu,
        identificacion_usu:req.body.identificacion_usu,
        rol_usu:req.body.rol_usu,
                
    });
     //metodo para guardar los nuevos usuarios
     userAdd.save().then((usercreado=>{
    console.log(usercreado)
    res.status(201).json("Creado exitosamente");
    }));
}

exports.getUserId=(req, res)=>{
    Usuario.findById(req.params.id).then((UserResult)=>{
      if(UserResult){
        res.status(200).json(UserResult);
      }else{
        res.status(404).json("Usuario no encontrado")
      }
    })
  }
  //Metodo para buscar un usuario por un valor
  exports.getIdentificacion=(req, res) => {
    Usuario.find({identificacion_usu:true}).then((UserResult) => {
      res.status(200).json(UserResult);
    });
  }