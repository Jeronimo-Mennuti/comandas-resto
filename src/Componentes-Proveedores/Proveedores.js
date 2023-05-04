import React from 'react'
import { Link } from 'react-router-dom'


function Proveedores() {
    return (
    <>
    <div>
    <Link to="/Inventario">
      <button className='btn btn-primary botonVolver'>
        Volver
      </button>
      </Link>
      </div>
    <div>
      <h1>Proveedores</h1>
    </div>
    <div>
    <Link to='/NuevoProveedor'>
    <button className='btn btn-primary button'>Nuevo Proveedor</button>
    </Link>
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

export default Proveedores