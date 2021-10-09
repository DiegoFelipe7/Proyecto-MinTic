import './productos.css';
import iconUser from '../../img/icon-user.svg';
import iconIng from '../../img/icon-btn-ingresar.svg';
import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Header from '../../components/Header';
import AdminLista_Products from './AdminLista_ Products';
import Alert from '../../components/Alert';
import serviceApi from "../../servicios/serviceApi";

const products = [{
    "id": 1,
    "nombreP": "Pantalones",
    "cantidad": 3,
    "precio": 15000,
    "image":"https://m.media-amazon.com/images/I/61qMt8YrVtL._AC_UY445_.jpg"
    
},
{
    "id": 2,
    "nombreP": "Camisas",
    "cantidad": 2,
    "precio": 10000,
    "image":"https://contents.mediadecathlon.com/p1786958/k$2b0a8a97ea3b1154f2f3734009451fe2/pantalon-de-montana-y-trekking-viaje-de-hombre-forclaz-travel-100-gris.jpg?&f=452x452"
}];

class AgregarProducto extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fields: {},
            errors: {},
           alerta: "",
           categorias: []
        };

        const getCategoria = async () => {
            const response = await serviceApi.categorias.list();
            this.setState({ categorias: response});
        }
        getCategoria();
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Nombre
        if (!fields["regProductNombre"]) {
            formIsValid = false;
            errors["regProductNombre"] = "Campo obligatorio.";
        }

        if (typeof fields["regProductNombre"] !== "undefined") {
            if (!fields["regProductNombre"].match(/^[ña-zA-Z ]+$/)) {
                formIsValid = false;
                errors["regProductNombre"] = "Solo letras.";
            }
        }

        //Categoria
        if (!fields["regProductCategoria"]) {
            formIsValid = false;
            errors["regProductCategoria"] = "Campo obligatorio.";
        }

        if (typeof fields["regProductCategoria"] !== "undefined") {
            if (!fields["regProductCategoria"] != "") {
                formIsValid = false;
                errors["regProductCategoria"] = "Seleccione una opción";
            }
        }

        //Precio
        if (!fields["regProductPrecio"]) {
            formIsValid = false;
            errors["regProductPrecio"] = "Campo obligatorio.";
        }

        if (typeof fields["regProductPrecio"] !== "undefined") {
            if (!fields["regProductPrecio"].match(/^[0-9]+$/)) {
                formIsValid = false;
                errors["regProductPrecio"] = "Solo números desde 0 en adelante.";
            }
        }
        
        //Cantidad
        if (!fields["regProductCantidad"]) {
            formIsValid = false;
            errors["regProductCantidad"] = "Campo obligatorio.";
        }

        if (typeof fields["regProductCantidad"] !== "undefined") {
            if (!fields["regProductCantidad"].match(/^[0-9]+$/)) {
                formIsValid = false;
                errors["regProductCantidad"] = "Solo números desde 0 en adelante.";
            }
        }

        //Disponible
        if (!fields["regProductDisponible"]) {
            formIsValid = false;
            errors["regProductDisponible"] = "Campo obligatorio.";
        }

        if (typeof fields["regProductDisponible"] !== "undefined") {
            if (!fields["regProductDisponible"] != "") {
                formIsValid = false;
                errors["regProductDisponible"] = "Seleccione una opción";
            }
        }

        //Descripcion
        if (!fields["regProductDescripcion"]) {
            formIsValid = false;
            errors["regProductDescripcion"] = "Campo obligatorio.";
        }

        if (typeof fields["regProductDescripcion"] !== "undefined") {
            if (!fields["regProductDescripcion"].match(/^[ña-zA-Z0-9 .:,)(-=&%\n]+$/)) {
                formIsValid = false;
                errors["regProductDescripcion"] = "Carácteres permitidos: .:,)(-=&%";
            }
        }

        //Imagen
        if (!fields["regProductImagen"]) {
            formIsValid = false;
            errors["regProductImagen"] = "Campo obligatorio.";
        }

        if (!fields["regProductImagen"].match(/\.(jpg|jpeg|png|gif|svg)$/)) {
            formIsValid = false;
            errors["regProductImagen"] = "Tipo de imagen permitidos jpg, jpeg, png, gif, svg.";
        }

        this.setState({ errors: errors , alerta: ""});
        return formIsValid;
    }

    contactSubmit(e) {
        e.preventDefault();
        

        if (this.handleValidation()) {
            
            products.push(
                {
                    nombreP: e["target"]["regProductNombre"].value,
                    cantidad: e["target"]["regProductCantidad"].value,
                    precio: e["target"]["regProductPrecio"].value,
                    imagen: e["target"]["regProductImagen"].value
                }
            );
            const p = {
                nombre_producto: e["target"]["regProductNombre"].value,
                precio_unitario: e["target"]["regProductPrecio"].value,
                cantidad_producto: e["target"]["regProductCantidad"].value,
                descripcion: e["target"]["regProductDescripcion"].value,
                disponible: e["target"]["regProductDisponible"].value
            };

            const add = async () => {
                const response = await serviceApi.products.create(p);
                console.log(response);
            }
            add();
            
            this.setState({alerta: "success"});
        }else{
	        this.setState({alerta: "danger"});
        }

    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields, alerta: ""});
    }

    render() {
        return (
            <div>
                <div>
                    <Header />
                </div><br />
                <div className="container-sm">
                    <div className="row justify-content-center">
                        <div className="col col-md-9 regProducto-content">
                            <div className="col-sm-auto">
                                <div className="row justify-content-center">
                                    <div className="col-sm-auto">
                                        <h3>Agregar Producto</h3>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-sm-6">
                                        {this.state.alerta == "success" ? <Alert tipo="success" mensaje="Producto agregado correctamente"/>: ""}
                                        {this.state.alerta == "danger" ? <Alert tipo="danger" mensaje="Error al agregar el producto"/>: ""}
                                    </div>
                                </div><br />
                                <form className="card" onSubmit={this.contactSubmit.bind(this)} action="../api/products" type="POST">
                                    <div className="row g-2 p-2">
                                        <div className="col-sm-6 position-relative">
                                            <label htmlFor="regProductNombre" className="form-label">Nombre</label>
                                            <div className="input-group justify-content-center">
                                                <span className="input-group-text" id="inputGroupPrepend">
                                                    <img src={iconUser} className="producto-content-form-icon" alt="icono user" />
                                                </span>
                                                <input type="text" onChange={this.handleChange.bind(this, "regProductNombre")} value={this.state.fields["regProductNombre"]} className="form-control" id="regProductNombre" name="regProductNombre" aria-describedby="inputGroupPrepend" placeholder="Escriba el nombre del producto" required />
                                            </div>
                                            <div>
                                                <span style={{ color: "red" }}>{this.state.errors["regProductNombre"]}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 position-relative">
                                            <label htmlFor="regProductCategoria" className="form-label">Categoria</label>
                                            <div className="input-group justify-content-center">
                                                <span className="input-group-text">
                                                    <img src={iconUser} className="producto-content-form-icon" alt="icono"/>
                                                </span>
                                                <select className="form-select" id="regProductCategoria" onChange={this.handleChange.bind(this, "regProductCategoria")} value={this.state.fields["regProductCategoria"]} required >
                                                    <option value="" selected>Seleccione la categoria</option>
                                                    {this.state.categorias.map((cat) => {
                                                        return (
                                                            <option value={cat._id}>{cat.nombre_categoria}</option>
                                                        )
                                                        
                                                    })}
                                                    
                                                </select>
                                            </div>
                                            <div>
                                                <span style={{ color: "red" }}>{this.state.errors["regProductCategoria"]}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-5 position-relative">
                                            <label htmlFor="regProductPrecio" className="form-label">Precio</label>
                                            <div className="input-group has-validation  justify-content-center">
                                                <span className="input-group-text" id="inputGroupPrepend">
                                                    $
                                                </span>
                                                <input type="number" onChange={this.handleChange.bind(this, "regProductPrecio")} value={this.state.fields["regProductPrecio"]} className="form-control" id="regProductPrecio" name="regProductPrecio" aria-describedby="inputGroupPrepend" placeholder="Escriba el precio del producto" required />
                                            </div>
                                            <div>
                                                <span style={{ color: "red" }}>{this.state.errors["regProductPrecio"]}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-2 position-relative">
                                            <label htmlFor="regProductCantidad" className="form-label">Cantidad</label>
                                            <div className="input-group has-validation  justify-content-center">
                                                <span className="input-group-text" id="inputGroupPrepend">
                                                    #
                                                </span>
                                                <input type="number" onChange={this.handleChange.bind(this, "regProductCantidad")} value={this.state.fields["regProductCantidad"]} className="form-control" id="regProductCantidad" name="regProductCantidad" aria-describedby="inputGroupPrepend" placeholder="Escriba la cantidad total del producto" required />
                                            </div>
                                            <div>
                                                <span style={{ color: "red" }}>{this.state.errors["regProductCantidad"]}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-5 position-relative">
                                            <label htmlFor="regProductDisponible" className="form-label">Disponible</label>
                                            <div className="input-group justify-content-center">
                                                <span className="input-group-text">
                                                    <img src={iconUser} className="producto-content-form-icon" alt="icono"/>
                                                </span>
                                                <select className="form-select" id="regProductDisponible" onChange={this.handleChange.bind(this, "regProductDisponible")} value={this.state.fields["regProductDisponible"]} required >
                                                    <option value="" selected>Seleccione el estado del producto</option>
                                                    <option value="true">Disponible</option>
                                                    <option value="false">No disponible</option>
                                                </select>
                                            </div>
                                            <div>
                                                <span style={{ color: "red" }}>{this.state.errors["regProductDisponible"]}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 position-relative">
                                            <div className="input-group mb-3">
                                                <label className="input-group-text" for="regProductImagen">Imagen</label>
                                                <input type="file" className="form-control" onChange={this.handleChange.bind(this, "regProductImagen")} id="regProductImagen" name="regProductImagen"/>
                                            </div>
                                            <div>
                                                <span style={{ color: "red" }}>{this.state.errors["regProductImagen"]}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 position-relative">
                                            <label htmlFor="regProductDescripcion" className="form-label">Descripción</label>
                                            <textarea className="form-control" onChange={this.handleChange.bind(this, "regProductDescripcion")} value={this.state.fields["regProductDescripcion"]} id="validationTextarea" name="regProductDescripcion" placeholder="Agregue una descripcion del producto" required></textarea>
                                            <div>
                                                <span style={{ color: "red" }}>{this.state.errors["regProductDescripcion"]}</span>
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
                    <div className="row justify-content-center">
                        <div className="card col-sm-9">
                            <div className="card-header">
                                <div className="row justify-content-center">
                                    <div className="col-sm-auto">
                                        <h3>Lista de Productos</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
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
                                        <AdminLista_Products prod={products} />
                                    </tbody>
                                </table>
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
        );
    }
}

export default AgregarProducto;