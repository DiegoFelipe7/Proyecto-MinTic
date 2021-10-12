import './ventas.css';
import iconCliente from '../../img/icon-cliente.png';
import iconProducto from '../../img/icon-producto.png';
import iconVendedor from '../../img/icon-vendedor.png';
import iconIng from '../../img/icon-btn-ingresar.svg';
import React from "react";
import Header from '../../components/Header';
import ListaVentas from './ListaVentas';
import Alert from '../../components/Alert';
import serviceApi from "../../servicios/serviceApi";
import CallApi from "../../api";
import { useEffect, useState } from "react";



class AgregarVenta extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            fields: {},
            errors: {},
            alerta: "",
            datos: [],
            products: [],
            vendedores: [],
            usuarios: []

        }
        const getVendedires = async () => {
            const response = await serviceApi.products.list();
            this.setState({ products: response });
        }
        getVendedires();

        const getUsuarios = async () => {
            const response = await serviceApi.Usuarios.list();
            // Filtra solo rol vendedores
            const result = response.filter(z => z.rol_usu == "Vendedor");
            this.setState({vendedores: result}); 
        }
        getUsuarios();

    }
    //Extrae el object de la categoria.
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
        if (!fields["regVentaCliente"]) {
            formIsValid = false;
            errors["regVentaCliente"] = "Campo obligatorio.";
        }

        if (typeof fields["regVentaCliente"] !== "undefined") {
            if (!fields["regVentaCliente"].match(/^[a-zA-Z ]+$/)) {
                formIsValid = false;
                errors["regVentaCliente"] = "Solo letras.";
            }
        }

        //Numero de documento
        if (!fields["regVentaDocumento"]) {
            formIsValid = false;
            errors["regVentaDocumento"] = "Campo obligatorio.";
        }

        if (typeof fields["regVentaDocumento"] !== "undefined") {
            if (!fields["regVentaDocumento"].match(/^[0-9]+$/)) {
                formIsValid = false;
                errors["regVentaDocumento"] = "Solo números desde 0 en adelante.";
            }
        }
        //Productos
        if (!fields["regVentaProducto"]) {
            formIsValid = false;
            errors["regVentaProducto"] = "Campo obligatorio.";
        }

        if (typeof fields["regVentaProducto"] !== "undefined") {
            if (!fields["regVentaProducto"] != "") {
                formIsValid = false;
                errors["regVentaProducto"] = "Seleccione una opción";
            }
        }

        //Cantidad
        if (!fields["regVentaCantidad"]) {
            formIsValid = false;
            errors["regVentaCantidad"] = "Campo obligatorio.";
        }

        if (typeof fields["regVentaCantidad"] !== "undefined" && fields["regVentaCantidad"] > 0) {
            if (!fields["regVentaCantidad"].match(/^[0-9]+$/)) {
                formIsValid = false;
                errors["regVentaCantidad"] = "Solo números mayores a 0.";
            }
        } else {
            formIsValid = false;
            errors["regVentaCantidad"] = "Solo números mayores a 0.";
        }
        //Total
        // if (!fields["regVentaTotal"]) {
        //     formIsValid = false;
        //     errors["regVentaTotal"] = "Campo obligatorio.";
        // }

        // if (typeof fields["regVentaTotal"] !== "undefined") {
        //     if (!fields["regVentaTotal"].match(/^[0-9]+$/)) {
        //         formIsValid = false;
        //         errors["regVentaTotal"] = "Solo números desde 0 en adelante.";
        //     }
        // }
        //Vendedor
        if (!fields["regVentaVendedor"]) {
            formIsValid = false;
            errors["regVentaVendedor"] = "Campo obligatorio.";
        }

        if (typeof fields["regVentaVendedor"] !== "undefined") {
            if (!fields["regVentaVendedor"] != "") {
                formIsValid = false;
                errors["regVentaVendedor"] = "Seleccione una opción";
            }
        }

        this.setState({ errors: errors, alerta: "" });
        return formIsValid;
    }


    contactSubmit(e) {
        e.preventDefault();
        // const products = [];
        console.log(e)
        const precioUni = this.filterPrecioUni(e["target"]["regVentaProducto"].value)
        const cantidaad = e["target"]["regVentaCantidad"].value;
        const total = precioUni * cantidaad
        console.log(total)
        const venta = {
            nombreCliente: e["target"]["regVentaCliente"].value,
            producto: this.filterProd(e["target"]["regVentaProducto"].value),
            cantidad: e["target"]["regVentaCantidad"].value,
            nombreVendedor: this.filterVend(e["target"]["regVentaVendedor"].value),
            total: total
        }

        const add = async () => {
            const response = await serviceApi.ventas.create(venta);
            console.log(response);
        }
        add();

        if (this.handleValidation()) {


            this.setState({ alerta: "success" });

        } else {
            this.setState({ alerta: "danger" });
        }
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields, alerta: "" });
    }

    render() {
        return (
            <div>
                <div>
                    <Header />
                </div>
                <div className="container-sm">
                    <div className="row justify-content-center">
                        <div className="col col-md-9 regVenta-content">
                            <div className="col-sm-auto">
                                <div className="row justify-content-center">
                                    <div className="col-sm-auto">
                                        <h3>Registrar Venta</h3>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-sm-6">
                                        {this.state.alerta == "success" ? <Alert tipo="success" mensaje="Venta agregada correctamente" /> : ""}
                                        {this.state.alerta == "danger" ? <Alert tipo="danger" mensaje="Error al agregar la venta" /> : ""}
                                    </div>
                                </div><br />
                                <form className="card" onSubmit={this.contactSubmit.bind(this)}>
                                    <div className="row g-2 p-2">
                                        <div className="col-sm-5 position-relative">
                                            <label for="regVentaCliente" className="form-label">Nombre del cliente</label>
                                            <div className="input-group justify-content-center">
                                                <span className="input-group-text">
                                                    <img src={iconCliente} className="ventas-content-form-icon" alt="icono" />
                                                </span>
                                                <input type="text" class="form-control" id="regVentaCliente" onChange={this.handleChange.bind(this, "regVentaCliente")} value={this.state.fields["regVentaCliente"]} placeholder="Escriba el nombre del cliente" required ></input>
                                            </div>
                                            <div>
                                                <span style={{ color: "red" }}>{this.state.errors["regVentaCliente"]}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-3 position-relative">
                                            <label for="regVentaDocumento" className="form-label">Número de documento</label>
                                            <div className="input-group justify-content-center">
                                                <span className="input-group-text">
                                                    #
                                                </span>
                                                <input type="number" class="form-control" id="regVentaDocumento" onChange={this.handleChange.bind(this, "regVentaDocumento")} value={this.state.fields["regVentaDocumento"]} placeholder="Escriba el numero de documento" required ></input>
                                            </div>
                                            <div>
                                                <span style={{ color: "red" }}>{this.state.errors["regVentaDocumento"]}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 position-relative">
                                            <label for="regVentaProducto" className="form-label">Producto</label>
                                            <div className="input-group justify-content-center">
                                                <span className="input-group-text">
                                                    <img src={iconProducto} className="ventas-content-form-icon" alt="icono" />
                                                </span>
                                                <select className="form-select" id="regVentaProducto" onChange={this.handleChange.bind(this, "regVentaProducto")} value={this.state.fields["regVentaProducto"]} required >
                                                    <option value="" selected>Seleccione un producto</option>
                                                    {this.state.products.map((prod) => {
                                                        return (
                                                            <option value={prod._id}>{prod.nombre_producto}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            <div>
                                                <span style={{ color: "red" }}>{this.state.errors["regVentaProducto"]}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-5 position-relative">
                                            <label for="regVentaCantidad" className="form-label">Cantidad</label>
                                            <div className="input-group justify-content-center">
                                                <span className="input-group-text">
                                                    #
                                                </span>
                                                <input type="number" class="form-control" id="regVentaCantidad" onChange={this.handleChange.bind(this, "regVentaCantidad")} value={this.state.fields["regVentaCantidad"]} placeholder="Escriba la cantidad de productos" required ></input>
                                            </div>
                                            <div>
                                                <span style={{ color: "red" }}>{this.state.errors["regVentaCantidad"]}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-3 position-relative">
                                            <label for="regVentaTotal" className="form-label">Total</label>
                                            <div className="input-group justify-content-center">
                                                <span className="input-group-text">
                                                    $
                                                </span>
                                                <input type="number" class="form-control" id="regVentaTotal" onChange={this.handleChange.bind(this, "regVentaTotal")} value="12230" disabled readonly></input>
                                            </div>
                                            <div>
                                                <span style={{ color: "red" }}>{this.state.errors["regVentaTotal"]}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 position-relative">
                                            <label for="regVentaVendedor" className="form-label">Vendedor</label>
                                            <div className="input-group justify-content-center">
                                                <span className="input-group-text">
                                                    <img src={iconVendedor} className="ventas-content-form-icon" alt="icono" />
                                                </span>
                                                <select className="form-select" id="regVentaVendedor" onChange={this.handleChange.bind(this, "regVentaVendedor")} value={this.state.fields["regVentaVendedor"]} required >
                                                    <option value="" selected>Seleccione el vendedor</option>
                                                    {this.state.vendedores.map((vend) => {
                                                        return (
                                                            <option value={vend._id}>{vend.nombre_usu}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            <div>
                                                <span style={{ color: "red" }}>{this.state.errors["regVentaVendedor"]}</span>
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
                        <div className="row justify-content-center">
                            <div className="card col-sm-9">
                                <div className="card-header">
                                    <div className="row justify-content-center">
                                        <div className="col-sm-auto">
                                            <h3>Lista de Ventas</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-responsive">
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
                                            <ListaVentas />
                                        </tbody>
                                    </table>
                                </div>
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

export default AgregarVenta;