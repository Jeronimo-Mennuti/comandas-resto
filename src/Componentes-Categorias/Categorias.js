import React, { useEffect, useState } from "react";
import { db } from "../ConfigFirebase/Firebase";
import { Link } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Categorias() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function fetchProductos() {
      const categoriasCollection = collection(db, "categorias");
      const categoriasSnapshot = await getDocs(categoriasCollection);
      const categoriasData = categoriasSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategorias(categoriasData);
    }
    fetchProductos();
  }, []);

  return (
    <>
      <div className='HeaderComponentes'>
        
        <Link to="/Pedidos">
          <FontAwesomeIcon className='BotonVolver' icon={faCircleArrowLeft} size= "3x"/>
        </Link>

        <Link to="/NuevaCategoria">
          <button className="btn btn-primary BotonMas">
            <i className="fas fa-plus"></i>
          </button>
        </Link>
      </div>

      <div>
        <h1 className='TituloComponentes'>Categorias</h1>
      </div>

      <div className="Categorias">
        {categorias.length > 0 && (
          <div className="">
            {categorias.map((categorias) => (
              <Link to={`/Productos/${categorias.nombre}`}>
                <div className='' key={categorias.id}>
                  <h5 className=''>{categorias.nombre}</h5>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className='FooterComponentes'>

        <div className="BotonFooter">
          <Link to="/NuevaCategoria">
            <button className="btn btn-primary">
              <i className="fas fa-plus"></i>
              Nueva categoria
            </button>
          </Link>
        </div>

        <nav className='NavBar'>
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
  )
}

export default Categorias;
