import iconUser from '../../img/icon-user.svg';
import iconIng from '../../img/icon-btn-ingresar.svg';
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import Header from '../../components/Header';
import Alert from '../../components/Alert';
import serviceApi from "../../servicios/serviceApi";

class UpdateProd extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {},
            errors: {},
            alerta: "",
            id: this.props.location.pathname.split('/')[2], //obtiene el id desde la url.
        };
        this.producto = {
            id: {},
            nombre: "",
            categoria: [],
            precio: 0,
            cantidad: 0,
            disponible: false,
            descripcion: "",
            imagen: ""
        }

        const getProduct = async () => {
            const response = await serviceApi.products.getById(this.state.id);
            this.producto["id"] = response._id;
            this.producto["nombre"] = response.nombre_producto;
            this.producto["categoria"] = response.categoria;
            this.producto["precio"] = response.precio_unitario;
            this.producto["cantidad"] = response.cantidad_producto;
            this.producto["disponible"] = response.disponible;
            this.producto["descripcion"] = response.descripcion;
            this.producto["imagen"] = response.imagen;
            console.log(response);
        }
        getProduct();
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Nombre
        if (!fields["updProductNombre"]) {
            formIsValid = false;
            errors["updProductNombre"] = "Campo obligatorio.";
        }

        if (typeof fields["updProductNombre"] !== "undefined") {
            if (!fields["updProductNombre"].match(/^[a-zA-Z ]+$/)) {
                formIsValid = false;
                errors["updProductNombre"] = "Solo letras.";
            }
        }

        //Categoria
        if (!fields["updProductCategoria"]) {
            formIsValid = false;
            errors["updProductCategoria"] = "Campo obligatorio.";
        }

        if (typeof fields["updProductCategoria"] !== "undefined") {
            if (!fields["updProductCategoria"] != "") {
                formIsValid = false;
                errors["updProductCategoria"] = "Seleccione una opción";
            }
        }

        //Precio
        if (!fields["updProductPrecio"]) {
            formIsValid = false;
            errors["updProductPrecio"] = "Campo obligatorio.";
        }

        if (typeof fields["updProductPrecio"] !== "undefined") {
            if (!fields["updProductPrecio"].match(/^[0-9]+$/)) {
                formIsValid = false;
                errors["updProductPrecio"] = "Solo números desde 0 en adelante.";
            }
        }

        //Cantidad
        if (!fields["updProductCantidad"]) {
            formIsValid = false;
            errors["updProductCantidad"] = "Campo obligatorio.";
        }

        if (typeof fields["updProductCantidad"] !== "undefined") {
            if (!fields["updProductCantidad"].match(/^[0-9]+$/)) {
                formIsValid = false;
                errors["updProductCantidad"] = "Solo números desde 0 en adelante.";
            }
        }

        //Disponible
        if (!fields["updProductDisponible"]) {
            formIsValid = false;
            errors["updProductDisponible"] = "Campo obligatorio.";
        }

        if (typeof fields["updProductDisponible"] !== "undefined") {
            if (!fields["updProductDisponible"] != "") {
                formIsValid = false;
                errors["updProductDisponible"] = "Seleccione una opción";
            }
        }

        //Descripcion
        if (!fields["updProductDesc"]) {
            formIsValid = false;
            errors["updProductDesc"] = "Campo obligatorio.";
        }

        if (typeof fields["updProductDesc"] !== "undefined") {
            if (!fields["updProductDesc"].match(/^[a-zA-Z0-9 .:,)(-=&%\n]+$/)) {
                formIsValid = false;
                errors["updProductDesc"] = "Carácteres permitidos: .:,)(-=&%";
            }
        }

        //Imagen
        if (!fields["updProductImagen"]) {
            formIsValid = false;
            errors["updProductImagen"] = "Campo obligatorio.";
        }

        if (!fields["updProductImagen"].match(/\.(jpg|jpeg|png|gif|svg)$/)) {
            formIsValid = false;
            errors["updProductImagen"] = "Tipo de imagen permitidos jpg, jpeg, png, gif, svg.";
        }


        this.setState({ errors: errors , alerta: ""});
        return formIsValid;
    }

    contactSubmit(e) {
        e.preventDefault();
        

        if (this.handleValidation()) {
            this.setState({alerta: "success"});
        }else{
	        this.setState({alerta: "danger"});
        }
    }

    handleChange(field, e) {
        let f = this.state.fields;
        f[field] = e.target.value;        
        this.setState({ f, alerta: ""});
    }
    render(){
    return (
        <div>
            <div>
                <Header />
            </div><br />
            <div className="container-sm">
                <div className="row justify-content-center">
                    <div className="col col-md-9 updProducto-content">
                        <div className="col-sm-auto">
                            <div className="row justify-content-center">
                                <div className="col-sm-auto">
                                    <h3>Actualizar Producto</h3>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-sm-6">
                                    {this.state.alerta == "success" ? <Alert tipo="success" mensaje="Producto actualizado correctamente"/>: ""}
                                    {this.state.alerta == "danger" ? <Alert tipo="danger" mensaje="Error al actualizar el producto"/>: ""}
                                </div>
                            </div><br />
                            <form className="card" onSubmit={this.contactSubmit.bind(this)} action="../api/products" type="POST">
                                <div className="row g-2 p-2">
                                    <div className="col-sm-6 position-relative">
                                        <label htmlFor="updProductNombre" className="form-label">Nombre</label>
                                        <div className="input-group justify-content-center">
                                            <span className="input-group-text" id="inputGroupPrepend">
                                                <img src={iconUser} className="producto-content-form-icon" alt="icono user" />
                                            </span>
                                            <input type="text" onChange={this.handleChange.bind(this, "updProductNombre")} value={this.producto.nombre} className="form-control" id="updProductNombre" name="updProductNombre" aria-describedby="inputGroupPrepend" placeholder="Escriba el nombre del producto" required />
                                        </div>
                                        <div>
                                            <span style={{ color: "red" }}>{this.state.errors["updProductNombre"]}</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 position-relative">
                                        <label htmlFor="updProductCategoria" className="form-label">Categoria</label>
                                        <div className="input-group justify-content-center">
                                            <span className="input-group-text">
                                                <img src={iconUser} className="producto-content-form-icon" alt="icono"/>
                                            </span>
                                            <select className="form-select" id="updProductCategoria" onChange={this.handleChange.bind(this, "updProductCategoria")} required >
                                            <option value={this.producto.categoria._id} >{this.producto.categoria.nombre_categoria}</option>
                                                <option value="Calzado" >Calzado</option>
                                                
                                            </select>
                                        </div>
                                        <div>
                                            <span style={{ color: "red" }}>{this.state.errors["updProductCategoria"]}</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-5 position-relative">
                                        <label htmlFor="updProductPrecio" className="form-label">Precio</label>
                                        <div className="input-group has-validation  justify-content-center">
                                            <span className="input-group-text" id="inputGroupPrepend">
                                                $
                                            </span>
                                            <input type="number" onChange={this.handleChange.bind(this, "updProductPrecio")} value={this.producto.precio} className="form-control" id="updProductPrecio" name="updProductPrecio" aria-describedby="inputGroupPrepend" placeholder="Escriba el precio del producto" required />
                                        </div>
                                        <div>
                                            <span style={{ color: "red" }}>{this.state.errors["updProductPrecio"]}</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-2 position-relative">
                                        <label htmlFor="updProductCantidad" className="form-label">Cantidad</label>
                                        <div className="input-group has-validation  justify-content-center">
                                            <span className="input-group-text" id="inputGroupPrepend">
                                                #
                                            </span>
                                            <input type="number" onChange={this.handleChange.bind(this, "updProductCantidad")} value={this.producto.cantidad} className="form-control" id="updProductCantidad" name="updProductCantidad" aria-describedby="inputGroupPrepend" placeholder="Escriba la cantidad total del producto" required />
                                        </div>
                                        <div>
                                            <span style={{ color: "red" }}>{this.state.errors["updProductCantidad"]}</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-5 position-relative">
                                        <label htmlFor="updProductDisponible" className="form-label">Disponible</label>
                                        <div className="input-group justify-content-center">
                                            <span className="input-group-text">
                                                <img src={iconUser} className="producto-content-form-icon" alt="icono"/>
                                            </span>
                                            <select className="form-select" id="updProductDisponible" onChange={this.handleChange.bind(this, "updProductDisponible")} required >
                                                <option value={this.producto.disponible} selected>{this.producto.disponible === true ? "Disponible":"No disponible"}</option>
                                                <option value="true">Disponible</option>
                                                <option value="false">No disponible</option>
                                            </select>
                                        </div>
                                        <div>
                                            <span style={{ color: "red" }}>{this.state.errors["updProductDisponible"]}</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 position-relative">
                                        <div className="input-group mb-3">
                                            <label className="input-group-text" for="updProductImagen">Imagen</label>
                                            <input type="file" className="form-control" onChange={this.handleChange.bind(this, "updProductImagen")} id="updProductImagen" name="updProductImagen"/>
                                        </div>
                                        <div>
                                            <span style={{ color: "red" }}>{this.state.errors["updProductImagen"]}</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 position-relative">
                                        <label htmlFor="updProductDescripcion" className="form-label">Descripción</label>
                                        <textarea className="form-control" onChange={this.handleChange.bind(this, "updProductDescripcion")} value={this.producto.descripcion} id="validationTextarea" name="updProductDescripcion" placeholder="Agregue una descripcion del producto" required></textarea>
                                        <div>
                                            <span style={{ color: "red" }}>{this.state.errors["updProductDescripcion"]}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="col-12 card-header">
                                        <div className="d-grid gap-1 d-sm-flex justify-content-center">
                                            <button type="submit" className="btn btn-primary">
                                                <img src={iconIng} className="producto-content-form-btn-icon" id="iconIng" alt="icono boton guardar"/>
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
        </div>
    );
    }
}
export default UpdateProd;