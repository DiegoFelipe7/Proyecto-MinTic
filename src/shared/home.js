import './home.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import Header from '../components/Header';
import Lista_Productos from "../producto/componente/lista-productos";
function home() {
  
  return (
    <div className="container-fluid">
      <div className="row">
          <Header />
      </div>
      <div className="row justify-content-center">
        <div className="p-3 col col-sm-7">
          <Lista_Productos />
        </div>
      </div>
      <footer >
        <div className="row justify-content-center ">
          <div className="col col-sm-3">
            &copy; Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default home;
