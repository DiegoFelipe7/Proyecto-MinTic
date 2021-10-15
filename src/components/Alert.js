import React, { useState } from "react";

const Alerta=({tipo, mensaje}) =>{
    
    const [show, setShow] = useState(true);
    if(show){
        return (
        <div>
            <div className={"alert alert-"+tipo}>
                <div className="alert-heading row">
                    <div className="col-sm-10 text-align-center">
                        <span>Mensaje</span>
                    </div>
                    <div className="col-sm-2 position-end">
                        <button onClick={() => setShow(false)} className="btn btn-primary" className="btn-close"></button>
                    </div>
                </div>
                <p>{mensaje}</p>
            </div>
        </div>
        );
        
    }else{
        return(
            null
        );
    }
  }
  
  export default Alerta;