import iconProducto from '../../img/icon-producto.png';
import iconImagen from '../../img/icon-imagen.png';
import iconProductoDisponible from '../../img/icon-productoDisponible.png';
import iconCategorias from '../../img/icon-categorias.png';
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
            alertaMensaje: "",
            actualizado: false,
            id: this.props.location.pathname.split('/')[2], //obtiene el id desde la url.
            updProductNombre: "",
            updProductCategoria: {},
            updProductPrecio: 0,
            updProductCantidad: 0,
            updProductDisponible: false,
            updProductDescripcion: "",
            updProductImagen: "",
            categorias: []
        };

        const getCategoria = async () => {
            const response = await serviceApi.categorias.list();
            this.setState({ categorias: response});
        }
        getCategoria();

        const getProduct = async () => {
            const response = await serviceApi.products.getById(this.state.id);
            this.setState({id: await response._id});
            this.setState({updProductNombre: await response.nombre_producto});
            this.setState({updProductCategoria: await response.categoria});
            this.setState({updProductPrecio: await response.precio_unitario});
            this.setState({updProductCantidad: await response.cantidad_producto});
            this.setState({updProductDisponible: await response.disponible});
            this.setState({updProductDescripcion: await response.descripcion});
            this.setState({updProductImagen: await response.imagen});
        }
        getProduct();
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Nombre
        if (typeof fields["updProductNombre"] !== "undefined") {
            if (!fields["updProductNombre"].match(/^[a-zA-Z ]+$/)) {
                formIsValid = false;
                errors["updProductNombre"] = "Solo letras.";
            }
        }

        //Categoria
        if (typeof fields["updProductCategoria"] !== "undefined") {
            if (fields["updProductCategoria"] === "") {
                formIsValid = false;
                errors["updProductCategoria"] = "Seleccione una opción";
            }
        }

        //Precio
        if (typeof fields["updProductPrecio"] !== "undefined") {
            if (!fields["updProductPrecio"].match(/^[0-9]+$/)) {
                formIsValid = false;
                errors["updProductPrecio"] = "Solo números desde 0 en adelante.";
            }
        }

        //Cantidad
        if (typeof fields["updProductCantidad"] !== "undefined") {
            if (!fields["updProductCantidad"].match(/^[0-9]+$/)) {
                formIsValid = false;
                errors["updProductCantidad"] = "Solo números desde 0 en adelante.";
            }
        }

        //Disponible
        if (typeof fields["updProductDisponible"] !== "undefined") {
            if (fields["updProductDisponible"] === "") {
                formIsValid = false;
                errors["updProductDisponible"] = "Seleccione una opción";
            }
        }

        //Descripcion
        if (typeof fields["updProductDesc"] !== "undefined") {
            if (!fields["updProductDesc"].match(/^[a-zA-Z0-9 .:,)(-=&%\n]+$/)) {
                formIsValid = false;
                errors["updProductDesc"] = "Carácteres permitidos: .:,)(-=&%";
            }
        }

        //Imagen
        /*if (!fields["updProductImagen"].match(/\.(jpg|jpeg|png|gif|svg)$/)) {
            formIsValid = false;
            errors["updProductImagen"] = "Tipo de imagen permitidos jpg, jpeg, png, gif, svg.";
        }*/

        this.setState({ errors: errors , alerta: "", alertaMensaje: ""});
        return formIsValid;
    }

    contactSubmit(e) {
        e.preventDefault();
        
        if (this.handleValidation()) {
            const updProducto = {
                _id: this.state.id,
                nombre_producto: this.state.updProductNombre,
                precio_unitario: this.state.updProductPrecio,
                cantidad_producto: this.state.updProductCantidad,
                descripcion: this.state.updProductDescripcion,
                disponible: this.state.updProductDisponible,
                imagen: this.state.updProductImagen,
                categoria: this.state.updProductCategoria
            };

            const upd = async () => {
                const response = await serviceApi.products.edit(updProducto);
                this.setState({actualizado: response});
            }
            upd();

            setTimeout(() => {
                if(this.state.actualizado){
                    this.setState({alerta: "success", alertaMensaje: "Actualizado correctamente"});
                    setTimeout(()=>window.location.replace("../Productos"), 1000);
                }else{
                    this.setState({alerta: "danger", alertaMensaje: "No fue posible actualizar el producto, intentelo mas tarde"});
                }
            }, 900);
            
        }else{
	        this.setState({alerta: "danger", alertaMensaje: "Error al actualizar, compruebe los campos"});
        }
    }

    handleChange(field, e) {
        let f = this.state.fields;
        f[field] = e.target.value;
        this.state[field] = e.target.value;
        this.setState({ f, alerta: "", alertaMensaje: ""});
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
                                {this.state.alerta ? <Alert tipo={this.state.alerta} mensaje={this.state.alertaMensaje}/>: ""}
                                </div>
                            </div><br />
                            <form className="card" onSubmit={this.contactSubmit.bind(this)} action="" type="">
                                <div className="row g-2 p-2">
                                    <div className="col-sm-6 position-relative">
                                        <label htmlFor="updProductNombre" className="form-label">Nombre</label>
                                        <div className="input-group justify-content-center">
                                            <span className="input-group-text" id="inputGroupPrepend">
                                                <img src={iconProducto} className="producto-content-form-icon" alt="icono user" />
                                            </span>
                                            <input type="text" onChange={this.handleChange.bind(this, "updProductNombre")} value={this.state.updProductNombre}  className="form-control" id="updProductNombre" name="updProductNombre" aria-describedby="inputGroupPrepend" placeholder={this.state.nombre} required />
                                        </div>
                                        <div>
                                            <span style={{ color: "red" }}>{this.state.errors["updProductNombre"]}</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 position-relative">
                                        <label htmlFor="updProductCategoria" className="form-label">Categoria</label>
                                        <div className="input-group justify-content-center">
                                            <span className="input-group-text">
                                                <img src={iconCategorias} className="producto-content-form-icon" alt="icono"/>
                                            </span>
                                            <select className="form-select" id="updProductCategoria" onChange={this.handleChange.bind(this, "updProductCategoria")} required >
                                                <option value={this.state.updProductCategoria._id} selected>{this.state.updProductCategoria.nombre_categoria}</option>
                                                {this.state.categorias.map((cat) => {
                                                    return (
                                                        <option value={cat._id}>{cat.nombre_categoria}</option>
                                                    )
                                                })}
                                                
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
                                            <input type="number" onChange={this.handleChange.bind(this, "updProductPrecio")} value={this.state.updProductPrecio} className="form-control" id="updProductPrecio" name="updProductPrecio" aria-describedby="inputGroupPrepend" placeholder="Escriba el precio del producto" required />
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
                                            <input type="number" onChange={this.handleChange.bind(this, "updProductCantidad")} value={this.state.updProductCantidad} className="form-control" id="updProductCantidad" name="updProductCantidad" aria-describedby="inputGroupPrepend" placeholder="Escriba la cantidad total del producto" required />
                                        </div>
                                        <div>
                                            <span style={{ color: "red" }}>{this.state.errors["updProductCantidad"]}</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-5 position-relative">
                                        <label htmlFor="updProductDisponible" className="form-label">Disponible</label>
                                        <div className="input-group justify-content-center">
                                            <span className="input-group-text">
                                                <img src={iconProductoDisponible} className="producto-content-form-icon" alt="icono"/>
                                            </span>
                                            <select className="form-select" id="updProductDisponible" onChange={this.handleChange.bind(this, "updProductDisponible")} required >
                                                <option value={this.state.updProductDisponible} selected>{this.state.updProductDisponible === true ? "Disponible":"No disponible"}</option>
                                                <option value="true">Disponible</option>
                                                <option value="false">No disponible</option>
                                            </select>
                                        </div>
                                        <div>
                                            <span style={{ color: "red" }}>{this.state.errors["updProductDisponible"]}</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 position-relative">
                                        <label htmlFor="updProductImagen" className="form-label">Url de la imagen</label>
                                        <div className="input-group justify-content-center">
                                            <span className="input-group-text" id="inputGroupPrepend">
                                                <img src={iconImagen} className="producto-content-form-icon" alt="icono user" />
                                            </span>
                                            <input type="text" onChange={this.handleChange.bind(this, "updProductImagen")} value={this.state.updProductImagen} className="form-control" id="updProductImagen" name="updProductImagen" aria-describedby="inputGroupPrepend" placeholder="Escriba la url de la imagen del producto " required />
                                        </div>
                                        <div>
                                            <span style={{ color: "red" }}>{this.state.errors["updProductImagen"]}</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 position-relative">
                                        <label htmlFor="updProductDescripcion" className="form-label">Descripción</label>
                                        <textarea className="form-control" onChange={this.handleChange.bind(this, "updProductDescripcion")} value={this.state.updProductDescripcion} id="validationTextarea" name="updProductDescripcion" placeholder="Agregue una descripcion del producto" required></textarea>
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