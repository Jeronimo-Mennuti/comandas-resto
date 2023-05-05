import React from 'react';
import { Link } from "react-router-dom";

function Login() {

    return (
        <>
        <form >
            <div className='input'>
                
                <input type="text" placeholder='Usuario'/>
            </div>
            <div className='input'>
                
                <input type="password" placeholder='Contraseña'/>
            </div>
            <button type="submit">Iniciar sesión</button>
        </form>
        
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
    );
    
}

export default Login;
