import React from 'react';
import { Link } from "react-router-dom";
import { faApple } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Login() {

  return (
    <>
<div className='logoContainer'>
<img src="../logo.png" alt="logo" className='logoInicio' />
      <h1 className='tituloLogo'>Menu Resto</h1>
      <p className='subtLogo'>Sign in or create an account</p>
    </div>
      
      <div class="container mt-5 ">
        <div class="row align-items-center justify-content-center h-100">
          <div class="col-12 col-md-8 col-lg-4 offset-lg-6">
            <div class="card cardInicioSesion p-3 h-100 w-100 mx-auto">
              <div class="card-body p-4">
                <h2 class="text-start mb-3">Sign in</h2>
                <p class="input-group mb-5 ">New user?<a href="" className='subtituloLogin'>Create an account</a></p>
                <p>Email address</p>
                <div class="input-group mb-3  border-bottom">
                  <input type="email" class="form-control form-control-lg border-0 rounded-0" aria-label="Email Address" aria-describedby="button-addon2" />
                </div>

                <div class="input-group-append ml-auto">
                  <button class="d-flex btn btn-primary mx-0 my-4 mb-1 mt-0 rounded-pill" type="button" id="button-addon2">Continue</button>
                </div>
                
                <div class="my-5 d-flex align-items-center justify-content-between mb-3">
                  <div class="border-top flex-grow-1 mr-1"></div>
                  <span class="mx-2">or</span>
                  <div class="border-top flex-grow-1 ml-2"></div>
                </div>
                
                <div class="d-flex flex-column max-w-lg mx-auto">
                  <button class="btn btn-outline-secondary text-dark border-gray btn-google mb-2 mt-4 rounded-pill w-100 my-button my-2" type="button">
                    <img src="../google.png" alt="icono google" className='iconoGoogle' /> Continue with Google
                  </button>
                  <button class="btn btn-outline-primary bg-facebook text-white mb-2 rounded-pill w-100 my-button my-2" type="button">
                    <i class="bi bi-facebook"></i> Continue with Facebook
                  </button>
                  <button class="btn btn-outline-dark text-white mb-2 rounded-pill w-100 my-button my-2" type="button">
                    <FontAwesomeIcon icon={faApple} style={{ color: "#ffffff" }} fontSize="1.5em" /> Continue with Apple
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <nav className='NavBar NavBarLogin'>
          <ul>
            <li>
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
