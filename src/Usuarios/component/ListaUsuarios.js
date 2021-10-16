import React,{useState, useEffect} from "react";
import serviceApi from "../../servicios/serviceApi";
import { Link } from "react-router-dom";

const ListaUsuarios = () => {
    const [ usuario, setListVentas ] = useState([]);
    const  [ modal , setModal ]  = useState ();
    const  [ alerta , setAlerta ]  = useState ();
    const  [ alertaMensaje , setAlertaMensaje ]  = useState ();
    const  [ value , setValue ]  = useState ();

    const functionModal = (show) => {
        setModal(show);
    };

    const EliminarItem = idSeleccionado => {
        const fetchData = async () => {
            const response = await serviceApi.Usuarios.delete(idSeleccionado);
            setAlerta("success");
            setAlertaMensaje("Usuario eliminada correctamente");
            setTimeout(() => window.location.reload(), 1000);
        };

        fetchData();
    };

    useEffect(() => {
        const fetchData = async () => {
          const response = await serviceApi.Usuarios.list();
          setListVentas(response);
        };
    
        fetchData();
      }, []);
    
    const UpdateItem=(idSeleccionado)=>{
        const lista = usuario.filter((item) => item.id == idSeleccionado);   
    }
    
    var c=1;//Contador
    return (
        <div>
            <div className={modal === true ? "modal d-block" : "modal d-one"}>
                <div className="modal-container">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className={"modal-header bg-"+alerta+" text-white"}>
                            <h5 className="modal-title" id="exampleModalLabel">{alerta === "success" ? "Hecho":"Aviso"}</h5>
                            <button type="button" className="btn btn-close" onClick={()=>functionModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            {alertaMensaje}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>functionModal(false)}>Cancelar</button>
                            <button type="button" className="btn btn-danger" onClick={() => EliminarItem(value)}>Eliminar</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Tipo Documento</th>
                            <th scope="col">N° Documento</th>
                            <th scope="col">Rol</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Estado</th>
                            <th scope="col" colspan="2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuario.map((usu) => (    
                        <tr>
                        <th scope="row">{c++}</th>
                        
                        <td>{usu.nombre_usu}</td>
                        <td>{usu.apellido_usu}</td>
                        <td>{usu.tipo_documento_usu}</td>        
                        <td>{usu.identificacion_usu}</td>                   
                        <td>{usu.rol_usu}</td>
                        <td>{usu.email_usu}</td>
                        <td>{usu.estado_activo === true ? "Activo":"Inactivo"}</td>
                        <td colspan="2" className="col">
                            <Link to={"/UpdateVend/"+usu._id}><button className="btn btn-warning btn-sm" onClick={()=>UpdateItem(usu.id)}>Editar</button></Link> 
                            <button type="button"  className="btn btn-danger btn-sm" onClick={()=>{functionModal(true); setValue(usu._id); setAlerta("danger"); setAlertaMensaje("¿Seguro que desea eliminar el usuario?");}}> Eliminar</button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default ListaUsuarios;

