import React from 'react'
import { Link } from 'react-router-dom';

function ActualizarInventario() {
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
     <h1>Actualizar Inventario</h1>
    </div>
    <div>
    <button className='btn btn-primary button'>Guardar</button>
    </div>
    <div className='input'>
    <input type='text' placeholder='Buscar'/>
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

export default ActualizarInventario
