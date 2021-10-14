import React,{useState, useEffect} from "react";
import serviceApi from "../../servicios/serviceApi";
import { Link } from "react-router-dom";
import api from "../../servicios/serviceApi";
const ListaVentas = () => {
    const  [ value , setValue ]  = useState (1);
    const [ Ventas, setListVentas ] = useState([]);
    const [ products, setProducts ] = useState([]);
    const [ usuarios, setUsers ] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const response = await serviceApi.ventas.list();
          const usuarios = await serviceApi.Usuarios.list();
          const resproducts = await serviceApi.products.list();
          setListVentas(response);
          setProducts(resproducts);
          setUsers(usuarios)
        };
    
        fetchData();
      }, []);
    
    const EliminarVenta = (event)=> {
        const id=event.target.id;
        api.ventas.delete(id);
        console.log(Ventas);
        const newVenta=Ventas.filter((venta)=>venta._id!==id);
        setListVentas([...newVenta])    
    }
    // const UpdateItem=(idSeleccionado)=>{
    //     const lista = Ventas.filter((item) => item.id == idSeleccionado);   
    // }
 

    return (
        
        Ventas.map((vent) => (    
             
            <tr key={vent._id}>
            <td>{vent.nombreCliente}</td>
            <td>{vent.producto}</td>
            <td>{vent.cantidad}</td>        
            <td>{vent.nombreVendedor}</td>                   
            <td>{vent.total}</td>
            <td colSpan="2" className="col">
                <Link to="/updateVentas" ><button className="btn btn-warning btn-sm" >Editar</button></Link> 
                <button type="button"  className="btn btn-danger btn-sm" id={vent._id} onClick={EliminarVenta}> Eliminar</button>
            </td>
            </tr>
        ))
    )
}
export default ListaVentas;

