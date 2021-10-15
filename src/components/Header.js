import React from "react";
import { Link } from "react-router-dom";
import './header.css'; 
import HeaderLogin from "./HeaderLogin";
import LogoImproTic from '../img/logo-improTic.png';

const Header=()=>{
    return(
        <nav class="navbar navbar-expand-lg  navbar-light bg-light ">
            <div class="container-fluid">
                <Link to="/" className="navbar-brand" ><img src={LogoImproTic} alt="..." className="img-fluid" id="logoImproTic"></img></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <HeaderLogin/>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;