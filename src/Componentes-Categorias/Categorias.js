import React, { useEffect, useState } from "react";
import { db } from "../ConfigFirebase/Firebase";
import { Link } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";


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
      <div className='headerProductos'>
        <div>
          <h1>Categorias</h1>
        </div>
        <div>
          <Link to="/NuevaCategoria">
            <button className="btn btn-primary buttonNuevoPedido">
              <i className="fas fa-plus"></i>
              Nuevo
            </button>
          </Link>
        </div>
      </div>

      <div className="categoriasContainer">
        {categorias.length > 0 && (
          <div className="cardCategoriasContainer">
            {categorias.map((categorias) => (
              <Link to={`/Productos/${categorias.nombre}`}>
                <div className='cardCategorias' key={categorias.id}>
                  <h5 className="card-title text-center">{categorias.nombre}</h5>
                </div>
              </Link>
            ))}
          </div>
        )}
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

export default Categorias;
