import React from 'react'
import { Link } from 'react-router-dom';





function Inventario() {


  return (
    <>
    <div>
    <Link to="/Pedidos">
      <button className='btn btn-primary botonVolver'>
        Volver
      </button>
      </Link>
      </div>
    <div>
      <h1>Inventario</h1>
    </div>
    <div>
      <Link to='/Inventario/Proveedores'>
      <button className='btn btn-primary button'>Proveedores</button>
      </Link>
    </div>
    <div>
      <Link to='/Inventario/InventarioActual'>
      <button className='btn btn-primary button'> Inventario actual</button>
      </Link>
    </div>
    <div>
    <Link to='/Inventario/ActualizarInventario'>
      <button className='btn btn-primary button'> Actualizar Inventario</button>
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

export default Inventario;
