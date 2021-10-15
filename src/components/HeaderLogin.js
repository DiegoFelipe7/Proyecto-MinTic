import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import iconUser from '../img/icon-user.svg';
import GoogleLogin from 'react-google-login';
import iconCarrito from '../img/icon-carrito.svg';
const HeaderLogin=({carrito}) =>{
    carrito = 3;
    const [loggIn, setLoggIn] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
    
        if (token === null) {
          setLoggIn(false);
        } else {
          setLoggIn(true);
        }
    }, []);
    if(loggIn === true){
        return(
            <React.Fragment>
                
                <li className="nav-item">
                    <Link to="/" className="nav-link active">Inicio</Link>
                </li>
                <li className="nav-item">
                    <Link to="/Ventas" className="nav-link">Gestion de Ventas</Link>
                </li>
                <li className="nav-item">
                    <Link to="/Usuarios" className="nav-link">Gestion de Usuarios</Link>
                </li>
                <li className="nav-item">
                    <Link to="/Productos" className="nav-link">Gestion de productos</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Form Login</Link>
                </li>
                <li className="nav-item" style={{marginLeft:'20px'}}>
                    <Link to="/carrito" className="position-relative">
                        <img src={iconCarrito} alt="..." className="header-icon"></img>
                        <span className="position-absolute top-0 start-80 translate-middle badge rounded-pill bg-danger">
                            {carrito}
                        </span>
                    </Link>
                </li>             
                <li className="nav-item" style={{marginLeft:'50px'}}>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => {localStorage.removeItem('token'); setTimeout(window.location.reload(), 1000);}}>Salir</button>
                </li>                           
            </React.Fragment>
        );
    }else{
        return(
            <div>            
                {/* <button className="btn btn-outline-success btn-sm" onClick={() => {localStorage.setItem("isLogged", true); setTimeout(window.location.reload(), 1000);}}>
                    Iniciar Sesion
                </button> */}
                <GoogleLogin
                    clientId="882471923244-2s7j8hlt0kftg4qlv00mm5rldl1camul.apps.googleusercontent.com"
                    buttonText="Iniciar sesion"
                    onSuccess={(res) => { 
                    setTimeout(window.location.reload(), 1000); 
                    localStorage.setItem("token", res.tokenId);
                    console.log(res)
                    }}
                    onFailure={(err)=>{console.log(err)}}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        );
    }
}

export default HeaderLogin; 