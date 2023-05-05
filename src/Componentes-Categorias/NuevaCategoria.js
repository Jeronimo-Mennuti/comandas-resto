import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../ConfigFirebase/Firebase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { collection, addDoc } from 'firebase/firestore';



function NuevoProveedor(onAgregarCategoria) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const navigate = useNavigate();
  const categoriasCollection = collection(db, 'categorias')
  
  const agregarCategoria = async () => {
    if (nombre.trim() === '') {
      alert('Debe agregar una categoria para continuar');
      return;
    }

    const nuevaCategoria = {
      nombre,
      descripcion,
      
    };
    try {
      const docRef = await addDoc(categoriasCollection, nuevaCategoria);
      console.log('Producto agregada con ID: ', docRef.id);
      onAgregarCategoria({ ...nuevaCategoria, id: docRef.id });
      navigate('/Categorias');
      setNombre('');
      setDescripcion('');
      } catch (error) {
      console.error('Error al agregar el producto: ', error);
    }
    
  };
  return (
    <>
    <div>
          <Link to="/Categorias">
            <FontAwesomeIcon className='botonVolver' icon={faCircleArrowLeft} size="lg" style={{ color: "#060709", }} />
          </Link>
        </div>
    <div>
    <h1>Crear Categoria</h1>
    </div>
    <div className='input'>
    <input type='text' placeholder='Nombre' value={nombre} onChange={(e) => setNombre(e.target.value)}/>
    </div>
    <div className='input'>
    <input type='text' placeholder='Descripcion' value={descripcion} onChange={(e) => setDescripcion(e.target.value)}/>
    </div>
    
    <div className="boton-guardar-container">
          <Link to="/Categorias">
            <button
              className="btn btn-primary button buttonNuevoPedido"
              onClick={agregarCategoria}>
              Guardar
            </button>
          </Link>
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

export default NuevoProveedor
