import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import serviceApi from "../../servicios/serviceApi";
import UpdateVend from './UpdateVend';
const ListaUsuarios = ({ usu }) => {
    const  [ value , setValue ]  = useState (1);
    const EliminarItem = idSeleccionado => {
        const newList = usu.filter((item) => item.id !== idSeleccionado)
        usu.splice(0, usu.length);
        newList.map((newUsu)=>{
            usu.push({
                id: newUsu.id,
                nombre_usu: newUsu.nombre_usu,
                apellido_usu: newUsu.apellido_usu,
                tipo_documento_usu: newUsu.tipo_documento_usu,
                identificacion_usu: newUsu.identificacion_usu,
                rol_usu:newUsu.rol_usu,
            })
        })
        setValue( ( value +  1 ) )
        console.log("ELIMINADO", idSeleccionado,newList)
    }
    const UpdateItem=(idSeleccionado)=>{
        const lista = usu.filter((item) => item.id == idSeleccionado);   
        <UpdateVend info = {lista} />  
    }


    const [ Usu, setListUsuarios ] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          const response = await serviceApi.Usuarios.list();
          setListUsuarios(response);
         
        };
    
        fetchData();
      }, []);
    return (
                Usu.map((usuarios)=>(
                    <tr>
                        <th scope="row">{usuarios.id}</th>
                        <td>{usuarios.nombre_usu}</td>
                        <td>{usuarios.apellido_usu}</td>
                        <td>{usuarios.tipo_documento_usu}</td>
                        <td>{usuarios.identificacion_usu}</td>
                        <td>{usuarios.rol_usu}</td>
                        <td colspan="2" className="col">
                        <Link to="/UpdateVend" ><button className="btn btn-warning btn-sm" onClick={()=>UpdateItem(usuarios.identificacion_usu)}>Editar</button></Link> 
                            <button type="button"  className="btn btn-danger" onClick={() => EliminarItem(usuarios.id)}> Eliminar </button>
                        </td>
            
                    </tr>
                ))
    );
}
export default ListaUsuarios;