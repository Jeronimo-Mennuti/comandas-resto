import React, { useState } from 'react';
import { Link } from "react-router-dom";


function Historial() {
  const [completedPedidos, setCompletedPedidos] = useState([]);
  const [productos, setProductos] = useState([]);

 return (
    <>

      <div>
        <h1>Historial de pedidos</h1>
      </div>

      <div>
        <button className='btn btn-primary button'>Pedidos completados</button>
      </div>

      <div className="card-container">
        {completedPedidos.map((pedido) => (
          <div className="card producto-card" key={pedido.id}>
            <div className="card-body">
              <div><h5>{productos.cantidad > 0 ? productos.cantidad : "1"}</h5></div>
              <h5 className="card-title text-center">
                {productos.nombre}
              </h5>
              <h4 className="card-price text-center">
                {productos.cantidad >= 1 ? '$' + productos.precio * productos.cantidad : '$' + productos.precio}
              </h4>
            </div>
          </div>
        ))}
      </div>

      <div>
        <nav>
          <ul>
            <li >
              <Link to="/Pedidos">Pedidos <i className="fas fa-clipboard-list"></i></Link>
            </li>
            <li>

              <Link to="/Productos">Productos <i className="fas fa-shopping-bag"></i></Link>
            </li>
            <li>
              <Link to="/Historial">Historial <i className="fas fa-history"></i></Link>
            </li>
            <li>
              <Link to="/Inventario">Inventario <i className="fas fa-box-open"></i></Link>
            </li>
          </ul>
        </nav>
      </div>

    </>
  )
}

export default Historial
