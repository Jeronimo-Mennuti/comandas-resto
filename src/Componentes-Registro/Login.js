import React from 'react';
import { Link } from "react-router-dom";

function Login() {

  return (
    <>
      <div className="body-componente">
        <form >
          <div className='form-floating mb-3 input'>
            <input
              type='text'
              className="form-control"
              id="floatingInput"
              min="1" />
            <label for="floatingInput">Usuario</label>
          </div>
          <div className='form-floating mb-3 input'>
            <input
              type='password'
              className="form-control"
              id="floatingInput"
              min="1" />
            <label for="floatingInput">Contraseña</label>
          </div>

          <div className="BotonFooter">
            <button className="btn btn-primary">
              iniciar Sesion
            </button>
          </div>
        </form>

        <div>
          <nav className='NavBar NavBarLogin'>
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
      </div>
    </>
  );

}

export default Login;
