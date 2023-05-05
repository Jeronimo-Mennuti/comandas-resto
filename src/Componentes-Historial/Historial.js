import React from 'react';
import { Link } from "react-router-dom";


function Historial() {
  

 return (
    <>

      <div>
        <h1>Historial de pedidos</h1>
      </div>

      <div>
        <button className='btn btn-primary button'>Pedidos completados</button>
      </div>

      

      <div>
        <nav>
          <ul>
            <li >
              <Link to="/Pedidos">Pedidos <i className="fas fa-clipboard-list"></i></Link>
            </li>
            <li>
              <Link to="/Categorias">Categorias <i className="fas fa-box-open"></i></Link>
            </li>
            <li>
              <Link to="/Historial">Historial <i className="fas fa-history"></i></Link>
            </li>
            </ul>
        </nav>
      </div>

    </>
  )
}

export default Historial
