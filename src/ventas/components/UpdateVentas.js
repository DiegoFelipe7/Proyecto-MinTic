import './ventas.css'
import iconCliente from '../../img/icon-cliente.png';
import iconProducto from '../../img/icon-producto.png';
import iconVendedor from '../../img/icon-vendedor.png';
import iconIng from '../../img/icon-btn-ingresar.svg';
import React, { useState } from "react";
import Header from '../../components/Header';
import Alert from '../../components/Alert';
import serviceApi from "../../servicios/serviceApi";

class UpdateVentas extends React.Component {
    constructor(props) {

        super(props)
        this.state = {
            fields: {},
            errors: {},
            alerta: "",
            alertaMensaje: "",
            actualizado: null,
            id: this.props.location.pathname.split('/')[2], //obtiene el id desde la url.
            updVentaCliente: null,
            updVentaDocumento: null,
            updVentaProducto: null,
            updVentaCantidad: null,
            updVentaVendedor: null,
            updVentaTotal: 0,
            pUnitario: 0,
            datos: [],
            products: [],
            vendedores: []

        }
        const getProducts = async () => {
            const response = await serviceApi.products.list();
            this.setState({ products: response });
        }
        getProducts();

        const getUsuarios = async () => {
            const response = await serviceApi.Usuarios.list();
            // Filtra solo rol vendedores
            const result = response.filter(x => x.rol_usu == "Vendedor");
            this.setState({vendedores: result}); 
        }
        getUsuarios();

        const getVentaId = async () => {
            const response = await serviceApi.ventas.getById(this.state.id);
            this.setState({id: await response._id});
            this.setState({updVentaCliente: await response.nombreCliente});
            this.setState({updVentaDocumento: await response.documento});
            this.setState({updVentaProducto: await response.producto});
            this.setState({updVentaCantidad: await response.cantidad});
            this.setState({updVentaVendedor: await response.nombreVendedor});
            this.setState({updVentaTotal: await response.total});
        }
        getVentaId();
    }
    //Extrae el object.
    filterProd(id) {
        const s = this.state.products.filter(x => x._id === id).map(z => z._id);
        return s;
    }
    filterVend(id) {
        const s = this.state.vendedores.filter(x => x._id === id).map(z => z._id);
        return s;
    }
    filterPrecioUni(id) {
        const s = this.state.products.filter(x => x._id === id).map(z => z.precio_unitario);
        return s;
    }


    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Cliente
        if (typeof fields["updVentaCliente"] !== "undefined") {
            if (!fields["updVentaCliente"].match(/^[a-zA-Z ]+$/)) {
                formIsValid = false;
                errors["updVentaCliente"] = "Solo letras.";
            }
        }

        //Numero de documento
        if (typeof fields["updVentaDocumento"] !== "undefined") {
            if (!fields["updVentaDocumento"].match(/^[0-9]+$/)) {
                formIsValid = false;
                errors["updVentaDocumento"] = "Solo números desde 0 en adelante.";
            }
        }
        
        //Productos
        if (typeof fields["updVentaProducto"] !== "undefined") {
            if (!fields["updVentaProducto"] != "") {
                formIsValid = false;
                errors["updVentaProducto"] = "Seleccione una opción";
            }
        }

        //Cantidad
        if (typeof fields["updVentaCantidad"] !== "undefined" && fields["updVentaCantidad"] > 0) {
            if (!fields["updVentaCantidad"].match(/^[0-9]+$/)) {
                formIsValid = false;
                errors["updVentaCantidad"] = "Solo números mayores a 0.";
            }
        }

        //Vendedor
        if (typeof fields["updVentaVendedor"] !== "undefined") {
            if (!fields["updVentaVendedor"] != "") {
                formIsValid = false;
                errors["updVentaVendedor"] = "Seleccione una opción";
            }
        }

        this.setState({ errors: errors, alerta: "" , alertaMensaje: ""});
        return formIsValid;
    }


    contactSubmit(e) {
        e.preventDefault();

        if (this.handleValidation()) {
            
            const venta = {
                _id: this.state.id,
                nombreCliente: this.state.updVentaCliente,
                producto: this.filterProd(this.state.updVentaProducto),
                cantidad: this.state.updVentaCantidad,
                documento: this.state.updVentaDocumento,
                nombreVendedor: this.filterVend(this.state.updVentaVendedor),
                total: this.state.updVentaTotal
            }

            const upd = async () => {
                const response = await serviceApi.ventas.edit(venta);
                this.setState({actualizado: response});
            }
            upd();

            setTimeout(() => {
                if(this.state.actualizado){
                    this.setState({alerta: "success", alertaMensaje: "Actualizado correctamente"});
                    setTimeout(()=>window.location.replace("../Ventas"), 1000);
                }else{
                    this.setState({alerta: "danger", alertaMensaje: "No fue posible actualizar el producto, intentelo mas tarde"});
                }
            }, 900);
            

        } else {
            this.setState({alerta: "danger", alertaMensaje: "Error al actualizar, compruebe los campos"});
        }
    }

    handleChange(field, e) {
        let f = this.state.fields;
        f[field] = e.target.value;
        this.state[field] = e.target.value;
        this.setState({ f, alerta: "" , alertaMensaje: ""});

        if(field === "updVentaProducto"){
            this.setState({pUnitario: this.filterPrecioUni(e.target.value)});
        }else if(this.state.updVentaProducto){
            this.setState({pUnitario: this.filterPrecioUni(this.state.updVentaProducto)});
        }else if(field === "updVentaCantidad"){
            this.setState({updVentaCantidad: e.target.value});
        }

        //Calcula valor total
        setTimeout(() => {
            if(this.state.updVentaCantidad >= 0){
                this.setState({updVentaTotal: this.state.pUnitario * this.state.updVentaCantidad});
            }
        }, 500);
        
    }

    render() {
        return (
            <div>
                <div>
                    <Header />
                </div><br/>
                <div className="container-sm">
                    <div className="row justify-content-center">
                        <div className="col col-md-9 updVenta-content">
                            <div className="col-sm-auto">
                                <div className="row justify-content-center">
                                    <div className="col-sm-auto">
                                        <h3>Actualizar Venta</h3>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-sm-6">
                                        {this.state.alerta ? <Alert tipo={this.state.alerta} mensaje={this.state.alertaMensaje}/>: ""}
                                    </div>
                                </div><br />
                                <form className="card" onSubmit={this.contactSubmit.bind(this)}>
                                    <div className="row g-2 p-2">
                                        <div className="col-sm-5 position-relative">
                                            <label for="updVentaCliente" className="form-label">Nombre del cliente</label>
                                            <div className="input-group justify-content-center">
                                                <span className="input-group-text">
                                                    <img src={iconCliente} className="ventas-content-form-icon" alt="icono" />
                                                </span>
                                                <input type="text" class="form-control" id="updVentaCliente" onChange={this.handleChange.bind(this, "updVentaCliente")} value={this.state.updVentaCliente} placeholder="Escriba el nombre del cliente" required ></input>
                                            </div>
                                            <div>
                                                <span style={{ color: "red" }}>{this.state.errors["updVentaCliente"]}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-3 position-relative">
                                            <label for="updVentaDocumento" className="form-label">Número de documento</label>
                                            <div className="input-group justify-content-center">
                                                <span className="input-group-text">
                                                    #
                                                </span>
                                                <input type="number" class="form-control" id="updVentaDocumento" onChange={this.handleChange.bind(this, "updVentaDocumento")} value={this.state.updVentaDocumento} placeholder="Escriba el numero de documento" required ></input>
                                            </div>
                                            <div>
                                                <span style={{ color: "red" }}>{this.state.errors["updVentaDocumento"]}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 position-relative">
                                            <label for="updVentaProducto" className="form-label">Producto</label>
                                            <div className="input-group justify-content-center">
                                                <span className="input-group-text">
                                                    <img src={iconProducto} className="ventas-content-form-icon" alt="icono" />
                                                </span>
                                                <select className="form-select" id="updVentaProducto" onChange={this.handleChange.bind(this, "updVentaProducto")} value={this.state.updVentaProducto} required >
                                                    <option value="" selected>Seleccione un producto</option>
                                                    {this.state.products.map((prod) => {
                                                        return (
                                                            <option value={prod._id}>{prod.nombre_producto}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            <div>
                                                <span style={{ color: "red" }}>{this.state.errors["updVentaProducto"]}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-5 position-relative">
                                            <label for="updVentaCantidad" className="form-label">Cantidad</label>
                                            <div className="input-group justify-content-center">
                                                <span className="input-group-text">
                                                    #
                                                </span>
                                                <input type="number" class="form-control" id="updVentaCantidad" onChange={this.handleChange.bind(this, "updVentaCantidad")} value={this.state.updVentaCantidad} placeholder="Escriba la cantidad de productos" required ></input>
                                            </div>
                                            <div>
                                                <span style={{ color: "red" }}>{this.state.errors["updVentaCantidad"]}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-3 position-relative">
                                            <label for="updVentaTotal" className="form-label">Total</label>
                                            <div className="input-group justify-content-center">
                                                <span className="input-group-text">
                                                    $
                                                </span>
                                                <input type="number" class="form-control" id="updVentaTotal" onChange={this.handleChange.bind(this, "updVentaTotal")} value={this.state.updVentaTotal} disabled readonly></input>
                                            </div>
                                            <div>
                                                <span style={{ color: "red" }}>{this.state.errors["updVentaTotal"]}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 position-relative">
                                            <label for="updVentaVendedor" className="form-label">Vendedor</label>
                                            <div className="input-group justify-content-center">
                                                <span className="input-group-text">
                                                    <img src={iconVendedor} className="ventas-content-form-icon" alt="icono" />
                                                </span>
                                                <select className="form-select" id="updVentaVendedor" onChange={this.handleChange.bind(this, "updVentaVendedor")} value={this.state.updVentaVendedor} required >
                                                    <option value="" selected>Seleccione el vendedor</option>
                                                    {this.state.vendedores.map((vend) => {
                                                        return (
                                                            <option value={vend._id}>{vend.nombre_usu}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            <div>
                                                <span style={{ color: "red" }}>{this.state.errors["updVentaVendedor"]}</span>
                                            </div>
                                        </div>
                                        <div className="col-12 card-header">
                                            <div className="d-grid gap-1 d-sm-flex justify-content-center">
                                                <button type="submit" className="btn btn-primary">
                                                    <img src={iconIng} className="ventas-content-form-btn-icon" id="iconIng" alt="icono boton guardar" />
                                                    Guardar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-sm">
                    <div className="row justify-content-center">
                        <div className="col col-sm-3">
                            &copy; Todos los derechos reservados.
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default UpdateVentas;