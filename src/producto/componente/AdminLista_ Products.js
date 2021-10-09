import { Link } from "react-router-dom";
import React,{useState, useEffect} from "react";
import serviceApi from "../../servicios/serviceApi";

const AdminLista_Products = ({ p }) => {
    
    const  [ value , setValue ]  = useState (3);
    const EliminarItem = idSeleccionado => {
        const newList = p.filter((item) => item.id !== idSeleccionado)
        p.splice(0, p.length);
        newList.map((newP)=>{
            p.push({
                id: newP.id,
                nombreP: newP.nombreP,
                cantidad: newP.cantidad,
                precio: newP.precio
            })
        })
        setValue( ( value +  1 ) )
        console.log("ELIMINADO", idSeleccionado,newList)
    };
    const [ listProductos, setListProductos ] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          const response = await serviceApi.products.list();
          setListProductos(response);
        };
    
        fetchData();
      }, []);
    
    return (
        
        listProductos.map((prod)=>(
        <tr>
            <th scope="row">1</th>
            <td>{prod.nombre_producto}</td>
            <td>{prod.categoria}</td>
            <td>{prod.precio_unitario}</td>
            <td>{prod.cantidad_producto}</td>
            <td>{prod.disponible === true ? "Si":"No"}</td>
            <td>{prod.descripcion}</td>
            <td>
                <Link to={"/updateProd/"+prod._id} id={prod._id}><button type="button" className="btn btn-warning">Editar</button></Link>
                <button className="btn btn-danger" onClick={() => EliminarItem(prod._id)}>Eliminar</button>
            </td>
        </tr>
        
    ))
    )
}


export default AdminLista_Products