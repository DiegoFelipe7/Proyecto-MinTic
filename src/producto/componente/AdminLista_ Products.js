import { Link } from "react-router-dom";
import React,{useState, useEffect} from "react";
import serviceApi from "../../servicios/serviceApi";

const AdminLista_Products = () => {
    const  [ modal , setModal ]  = useState ();
    const  [ alerta , setAlerta ]  = useState ();
    const  [ alertaMensaje , setAlertaMensaje ]  = useState ();
    const  [ value , setValue ]  = useState ();

    const functionModal = (show) => {
        setModal(show);
    };

    const EliminarItem = idSeleccionado => {
        const fetchData = async () => {
            const response = await serviceApi.products.delete(idSeleccionado);
            setAlerta("success");
            setAlertaMensaje("Producto eliminado correctamente");
            setTimeout(() => window.location.reload(), 1000);
        };

        fetchData();
    };

    const [ listProductos, setListProductos ] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          const response = await serviceApi.products.list();
          setListProductos(response);
        };
    
        fetchData();
      }, []);

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
                        <th scope="col">Categoria</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Disponible</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col" colSpan="2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {listProductos.map((prod)=>(
                    <tr>
                        <th scope="row">{c++}</th>
                        <td>{prod.nombre_producto}</td>
                        <td>{prod.categoria.nombre_categoria}</td>
                        <td>{prod.precio_unitario}</td>
                        <td>{prod.cantidad_producto}</td>
                        <td>{prod.disponible === true ? "Si":"No"}</td>
                        <td>{prod.descripcion}</td>
                        <td>
                            <Link to={"/updateProd/"+prod._id}><button type="button" className="btn btn-warning">Editar</button></Link>
                            <button className="btn btn-danger" onClick={()=>{functionModal(true); setValue(prod._id); setAlerta("danger"); setAlertaMensaje("¿Seguro que desea eliminar el producto?");}}>Eliminar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        
    )
}


export default AdminLista_Products