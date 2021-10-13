import React,{useState, useEffect} from "react";
import UpdateVentas from './UpdateVentas';
import serviceApi from "../../servicios/serviceApi";
import { Link } from "react-router-dom";
const ListaVentas = () => {
    const  [ value , setValue ]  = useState (1);
    const [ Ventas, setListVentas ] = useState([]);
    const [ products, setProducts ] = useState([]);
    const [ users, setUsers ] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          const response = await serviceApi.ventas.list();
          const respUser = await serviceApi.Usuarios.list();
          const resproducts = await serviceApi.products.list();
          setListVentas(response);
          setProducts(resproducts);
          setUsers(respUser)
        };
    
        fetchData();
      }, []);
      

    const EliminarItem = idSeleccionado => {
        // const newList = Ventas.filter((item) => item.id !== idSeleccionado)
        // Ventas.splice(0, Ventas.length);
        // newList.map((newVenta)=>{
        //     Ventas.push({
        //         id: newVenta.id,
        //         producto: newVenta.producto,
        //         cantidad: newVenta.cantidad,
        //         nombreVendedor: newVenta.nombreVendedor,
        //         nombreComprador: newVenta.nombreComprador,
        //         total:newVenta.total,
        //     })
        // })
        setValue( ( value +  1 ) )
        // console.log("ELIMINADO", idSeleccionado,newList)
    }
    const UpdateItem=(idSeleccionado)=>{
        const lista = Ventas.filter((item) => item.id == idSeleccionado);   
    }
 

    return (
        
        Ventas.map((vent) => (    
             
            <tr>
            <th scope="row">{vent.id}</th>
            <td>{vent.nombreCliente}</td>
            <td>{vent.producto}</td>
            <td>{vent.cantidad}</td>        
            <td>{vent.nombreVendedor}</td>                   
            <td>{vent.total}</td>
            <td colspan="2" className="col">
                <Link to="/updateVentas" ><button className="btn btn-warning btn-sm" onClick={()=>UpdateItem(vent.id)}>Editar</button></Link> 
                <button type="button"  className="btn btn-danger btn-sm" onClick={() => EliminarItem(vent.id)}> Eliminar</button>
            </td>
            </tr>
        ))
    )
}
export default ListaVentas;

