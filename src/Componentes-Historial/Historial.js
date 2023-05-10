import React from 'react';
import { Link } from "react-router-dom";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Historial() {


  return (
    <>

      <div className='HeaderComponentes'>
        <Link to="/Pedidos">
        <FontAwesomeIcon className='BotonVolver' icon={faCircleArrowLeft} size= "3x"/>
        </Link>
      </div>
      
      <div>
        <h1 className='TituloComponentes'>Historial de pedidos</h1>
      </div>

      <div className="BotonFooter">
        <button className='btn btn-primary'>Pedidos completados</button>
      </div>


      <div className='FooterComponentes'>
        <div>
          <nav className='NavBar'>
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
  )
}

export default Historial
