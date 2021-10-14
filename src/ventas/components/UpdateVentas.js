import './ventas.css'
import React, { useState } from "react";
import Header from '../../components/Header';
const ventas = [{
    "id": 1,
    "nombreComprador": "Manuel",
    "producto": "Pantalones",
    "cantidad": 5,
    "nombreVendedor": "Diego",
    "total": 15000
}, {
    "id": 2,
    "nombreComprador": "Cristian",
    "producto": "Camiseta",
    "cantidad": 5,
    "nombreVendedor": "Manuel Messi",
    "total": 15000
}]
const UpdateVentas=({ventas, setVentas})=> {
    /*const  [ value , setValue ]  = useState ({
        id:info.map((dato)=>(dato.id)),
        producto:info.map((dato)=>(dato.producto)),
        cantidad: info.map((dato)=>(dato.cantidad)),
        nombreVendedor: info.map((dato)=>(dato.nombreVendedor)),
        nombreComprador: info.map((dato)=>(dato.nombreComprador)),
        total:info.map((dato)=>(dato.total))
    });
    
    /*useEffect(()=>{
        setValue((datosAnteriores)=>{
            const nuevosDatos={...datosAnteriores};
            nuevosDatos.cantidad=info.map((dato)=>(dato.cantidad));
            nuevosDatos.nombreComprador=info.map((dato)=>(dato.nombreComprador));
            nuevosDatos.total=info.map((dato)=>(dato.total));
            return nuevosDatos;
        })
    },[value]);*/

    
    return (
        <div className="GestVend">
            <div>
                <Header />
            </div>
            <header className="GestVend-header">
                <body>
                   
                    <section>

                        <aside id="izq"></aside>

                        <div class="container">


                            <h3>Actualizar Información</h3>


                            <form class="row g-3">
                                <div class="col-md-6">
                                    <label for="" class="form-label">Comprador</label>
                                    <input type="text" class="form-control"  value={ventas[0].nombreComprador}></input>

                                </div>
                                <div class="col-md-6">
                                    <label for="" class="form-label">Producto</label>
                                    <select id="inputState" class="form-select">
                                        {ventas.map((pro) => {
                                            return (
                                                <option>{pro.producto}</option>
                                            )
                                        })
                                        }
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="" class="form-label">Cantidad</label>
                                    <input type="number" class="form-control" value={ventas[0].cantidad}/>
                                </div>
                                <div class="col-6">
                                    <label for="inputAddress" class="form-label">Vendedor</label>
                                    <select id="inputState" class="form-select">
                                        {ventas.map((pro) => (                                           
                                            <option>{pro.nombreVendedor}</option>
                                        ))}
                                    </select>
                                </div>
                             
                                <div class="col-md-6">
                                    <label for="" class="form-label">Vendedor</label>
                                    <select id="inputState" class="form-select">
                                        {ventas.map((vent) => {
                                            return (
                                                <option>{vent.nombreVendedor}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div class="col-6">
                                    <label for="inputAddress2" class="form-label">Total</label>
                                    <input type="text" class="form-control"  value={ventas[0].total}>
                                    </input>
                                </div>
                                <div class="col-12">
                                    <button type="submit" class="btn btn-primary">Edit</button>
                                </div>
                            </form>
                        </div>

                        <aside id="der"></aside>

                    </section>
                    <footer> &copy; Todos los derechos reservados.</footer>
                    
                </body>
            </header>

        </div>

    );
}
export default UpdateVentas;