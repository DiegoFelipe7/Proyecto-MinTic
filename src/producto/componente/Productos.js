const Producto=({producto, productos})=>{
  
    return(
      <div className="p-1 col">
        <div className="card" style={{width:'9rem'}}>
          <img src={producto.imagen} className="card-img-top" alt="productos"/>
          <div className="card-body">
            <h5 className="card-title">{producto.nombre_producto}</h5>
            <p className="card-text">$ {producto.precio_unitario}</p>
            <button className="btn btn-primary">Comprar</button>
          </div>
        </div>
      </div>
    );
}
export default Producto;