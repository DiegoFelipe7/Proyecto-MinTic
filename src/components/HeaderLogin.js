import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import iconUser from '../img/icon-user.svg';
import iconCarrito from '../img/icon-carrito.svg';

const HeaderLogin=({carrito}) =>{
    carrito = 3;
    const [loggIn, setLoggIn] = useState(false);
    useEffect(() => {
        const isLogged = localStorage.getItem("isLogged");
    
        if (isLogged === null) {
          localStorage.setItem("isLogged", false);
          setLoggIn(false);
        } else {
          setLoggIn(isLogged === "true");
        }
      }, []);
    if(localStorage.getItem("isLogged") === "true"){
        return(
            <div className="row justify-content-start">
                <div className="col-1">
                    <Link to="/carrito" className="position-relative">
                        <img src={iconCarrito} className="header-icon"></img>
                        <span className="position-absolute top-0 start-80 translate-middle badge rounded-pill bg-danger">
                            {carrito}
                        </span>
                    </Link>
                </div>
                <div className="col-1">
                    <img src={iconUser} className="header-icon"></img>
                </div>
                <div className="col-2 offset-1">
                    <button className="btn btn-outline-danger btn-sm" onClick={() => localStorage.setItem("isLogged", false)}>Salir</button>
                </div>

            </div>
        );
    }else{
        return(
            <div className="row justify-content-end">
                <div className="col">
                    <button className="btn btn-outline-success btn-sm" onClick={() => localStorage.setItem("isLogged", true)}>Iniciar Sesion</button>
                </div>
            </div>
        );
    }
}

export default HeaderLogin; 