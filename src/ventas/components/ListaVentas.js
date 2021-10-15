import React,{useState, useEffect} from "react";
import serviceApi from "../../servicios/serviceApi";
import { Link } from "react-router-dom";

const ListaVentas = () => {
    const [ ventas, setListVentas ] = useState([]);
    const [ products, setListProducts ] = useState([]);
    const  [ modal , setModal ]  = useState ();
    const  [ alerta , setAlerta ]  = useState ();
    const  [ alertaMensaje , setAlertaMensaje ]  = useState ();
    const  [ value , setValue ]  = useState ();

    const functionModal = (show) => {
        setModal(show);
    };

    const EliminarItem = idSeleccionado => {
        const fetchData = async () => {
            const response = await serviceApi.ventas.delete(idSeleccionado);
            setAlerta("success");
            setAlertaMensaje("Venta eliminada correctamente");
            setTimeout(() => window.location.reload(), 1000);
        };

        fetchData();
    };

    useEffect(() => {
        const fetchData = async () => {
          const response = await serviceApi.ventas.list();
          setListVentas(response);
        };
    
        fetchData();
      }, []);
    
    const UpdateItem=(idSeleccionado)=>{
        const lista = ventas.filter((item) => item.id == idSeleccionado);   
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
                        <th scope="col">Cliente</th>
                        <th scope="col">Producto</th>
                        <th scope="col">Cant.</th>
                        <th scope="col">Vendedor</th>
                        <th scope="col">Total</th>
                        <th scope="col" colSpan="2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((vent) => (    
                        <tr>
                        <th scope="row">{c++}</th>
                        <td>{vent.nombreCliente}</td>
                        <td>{vent.producto.nombre_producto}</td>
                        <td>{vent.cantidad}</td>        
                        <td>{vent.nombreVendedor.nombre_usu+" "+vent.nombreVendedor.apellido_usu}</td>                   
                        <td>{vent.total}</td>
                        <td colspan="2" className="col">
                            <Link to={"/updateVentas/"+vent._id}><button className="btn btn-warning btn-sm" onClick={()=>UpdateItem(vent.id)}>Editar</button></Link> 
                            <button type="button"  className="btn btn-danger btn-sm" onClick={()=>{functionModal(true); setValue(vent._id); setAlerta("danger"); setAlertaMensaje("¿Seguro que desea eliminar la venta?");}}> Eliminar</button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default ListaVentas;

