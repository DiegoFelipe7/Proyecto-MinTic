import React, { useState,useEffect } from "react";
import Header from "../../components/Header";
import serviceApi from "../../servicios/serviceApi";
import Alert from '../../components/Alert';
import iconCliente from '../../img/icon-cliente.png';
import iconProducto from '../../img/icon-producto.png';
import icondocumento from '../../img/icono-documento.png';
import iconIng from '../../img/icon-btn-ingresar.svg';
import correo from '../../img/correo-electronico.png';
import iconorol from '../../img/roles.png';
class UpdateVend extends React.Component{
    constructor(props){
        super(props)
        this.state={
            fields:{},
            error:{},
            alert:"",
            alertaMensaje:"",
            id: this.props.location.pathname.split('/')[2], //obtiene el id desde la url.
            updnombre_usu: "",
            updapellido_usu: "",
            updtipodocumento_usu: {},
            updidentificacion_usu: "",
            updrol_usu: {},
            updcorreo_usu:"",
            updestado_usu:{},
            

        };
        console.log(this.state.id);
        const getUsuarios = async () => {
            const response = await serviceApi.Usuarios.getById(this.state.id);
            this.setState({id: await response._id});
            this.setState({updnombre_usu: await response.nombre_usu});
            this.setState({updapellido_usu: await response.apellido_usu});
            this.setState({updtipodocumento_usu: await response.tipo_documento_usu});
            this.setState({updidentificacion_usu: await response.identificacion_usu});
            this.setState({updrol_usu: await response.rol_usu});
            this.setState({updcorreo_usu: await response.email_usu});
            this.setState({updestado_usu: await response.estado_activo});
        }
        getUsuarios();
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Nombre
        if (typeof fields["updnombre_usu"] !== "undefined") {
            if (!fields["updnombre_usu"].match(/^[a-zA-Z ]+$/)) {
                formIsValid = false;
                errors["updnombre_usu"] = "Solo letras.";
            }
        }

        //apellido
        if (typeof fields["updapellido_usu"] !== "undefined") {
            if (!fields["updapellido_usu"] != "") {
                formIsValid = false;
                errors["updapellido_usu"] = "Seleccione una opción";
            }
        }

        //tipo identificacion
        if (typeof fields["updtipodocumento_usu"] !== "undefined") {
            if (!fields["updtipodocumento_usu"]!="") {
                formIsValid = false;
                errors["updtipodocumento_usu"] = "seleccione una opcion.";
            }
        }

        //identificacion
        if (typeof fields["updidentificacion_usu"] !== "undefined") {
            if (!fields["updidentificacion_usu"].match(/^[0-9]+$/)) {
                formIsValid = false;
                errors["updidentificacion_usu"] = "Solo números desde 0 en adelante.";
            }
        }

        //Rol
        if (typeof fields["updrol_usu"] !== "undefined") {
            if (!fields["updrol_usu"] != "") {
                formIsValid = false;
                errors["updrol_usu"] = "Seleccione una opción";
            }
        }
        if (typeof fields["updcorreo_usu"] !== "undefined") {
            if (!fields["updcorreo_usu"] != "") {
                formIsValid = false;
                errors["updcorreo_usu"] = "Seleccione una opción";
            }
        }
        if (typeof fields["updestado_usu"] !== "undefined") {
            if (!fields["updestado_usu"] != "") {
                formIsValid = false;
                errors["updestado_usu"] = "Seleccione una opción";
            }
        }

        this.setState({ errors: errors , alertaMensaje: ""});
        return formIsValid;
    }

    contactSubmit(e) {
        e.preventDefault();
        if (this.handleValidation()) {
            
            const upusuario = {
                _id: this.state.id,
                nombre_usu: this.state.updnombre_usu,
                apellido_usu: this.state.updapellido_usu,
                tipo_documento_usu: this.state.updtipodocumento_usu,
                identificacion_usu: this.state.updidentificacion_usu,
                rol_usu:this.state.updrol_usu,
                email_usu: this.state.updcorreo_usu,
                estado_activo: this.state.updestado_usu
                
            }

            const upd = async () => {
                const response = await serviceApi.Usuarios.edit(upusuario);
                this.setState({actualizado: response});
            }
            upd();

            setTimeout(() => {
                if(this.state.actualizado){
                    this.setState({alerta: "success", alertaMensaje: "Actualizado correctamente"});
                    setTimeout(()=>window.location.replace("../Usuarios"), 1000);
                }else{
                    this.setState({alerta: "danger", alertaMensaje: "No fue posible actualizar el usuario, intentelo mas tarde"});
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
                                <h3>Actualizar Usuarios</h3>
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
                                    <label htmlFor="updnombre_usu" className="form-label">Nombre</label>
                                    <div className="input-group justify-content-center">
                                        <span className="input-group-text" id="inputGroupPrepend">
                                            <img src={iconCliente} className="producto-content-form-icon" alt="icono user" />
                                        </span>
                                        <input type="text" onChange={this.handleChange.bind(this, "updnombre_usu")} value={this.state.updnombre_usu}  className="form-control"   />
                                    </div>

                                </div>
                                <div className="col-sm-6 position-relative">
                                    <label htmlFor="updapellido_usu" className="form-label">Apelido</label>
                                    <div className="input-group has-validation  justify-content-center">
                                        <span className="input-group-text" id="inputGroupPrepend">
                                            <img src={iconCliente} className="producto-content-form-icon" alt="icono user" />
                                        </span>
                                        <input type="text" onChange={this.handleChange.bind(this, "updapellido_usu")} value={this.state.updapellido_usu} className="form-control" id="updapellido_usu" name="updapellido_usu" aria-describedby="inputGroupPrepend" placeholder="Escriba el precio del producto" required />
                                    </div>
                                </div>
                                <div className="col-sm-6 position-relative">
                                    <label htmlFor="updtipodocumento_usu" className="form-label">Tipo Identificacion</label>
                                    <div className="input-group justify-content-center">
                                        <span className="input-group-text">
                                            <img src={icondocumento} className="producto-content-form-icon" alt="icono"/>
                                        </span>
                                        <select className="form-select" id="updtipodocumento_usu" onChange={this.handleChange.bind(this, "updtipodocumento_usu")} required >
                                            <option value={this.state.updtipodocumento_usu} selected>{this.state.updtipodocumento_usu === "Cedula" ? "Cedula":" Pasaporte"}</option>
                                            <option value="Cedula">Cedula</option>
                                            <option value="Pasaporte">Pasaporte</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-6 position-relative">
                                    <label htmlFor="updidentificacion_usu" className="form-label">Identificacion</label>
                                    <div className="input-group has-validation  justify-content-center">
                                        <span className="input-group-text" id="inputGroupPrepend">
                                            #
                                        </span>
                                        <input type="number" onChange={this.handleChange.bind(this, "updidentificacion_usu")} value={this.state.updidentificacion_usu} className="form-control" id="updidentificacion_usu" name="updidentificacion_usu" aria-describedby="inputGroupPrepend" />
                                    </div>
                                </div>
                                <div className="col-sm-6 position-relative">
                                    <label htmlFor="updrol_usu" className="form-label">Rol</label>
                                    <div className="input-group justify-content-center">
                                        <span className="input-group-text">
                                            <img src={iconorol} className="producto-content-form-icon" alt="icono"/>
                                        </span>
                                        <select className="form-select" id="updrol_usu" onChange={this.handleChange.bind(this, "updrol_usu")} required >
                                            <option value={this.state.updrol_usu} selected>{this.state.updrol_usu === "Vendedor" ? "Vendedor":"Administrador"}</option>
                                            <option value="Administrador">Administrador</option>
                                            <option value="Vendedor">Vendedor</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-sm-6 position-relative">
                                    <label htmlFor="updcorreo_usu" className="form-label">Correo</label>
                                    <div className="input-group has-validation  justify-content-center">
                                        <span className="input-group-text" id="inputGroupPrepend">
                                         <img src={correo} className="producto-content-form-icon" alt="icono"/>
                                        
                                        </span>
                                        <input type="text" onChange={this.handleChange.bind(this, "updcorreo_usu")} value={this.state.updcorreo_usu} className="form-control" id="updcorreo_usu" name="updcorreo_usu" aria-describedby="inputGroupPrepend" />
                                    </div>
                                </div>
                                <div className="col-sm-5 position-relative">
                                    <label htmlFor="updestado_usu" className="form-label">Estado</label>
                                    <div className="input-group justify-content-center">
                                        <span className="input-group-text">
                                            <img src={iconorol} className="producto-content-form-icon" alt="icono"/>
                                        </span>
                                        <select className="form-select" id="updestado_usu" onChange={this.handleChange.bind(this, "updestado_usu")} required >
                                            <option value={this.state.updestado_usu} selected>{this.state.updestado_usu === "Activo" ? "Inactivo":"Activo"}</option>
                                            <option value="true">Activo</option>
                                            <option value="false">Inactivo</option>
                                        </select>
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
export default UpdateVend;







