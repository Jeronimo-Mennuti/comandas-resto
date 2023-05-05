import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { db } from '../ConfigFirebase/Firebase';
import { collection, addDoc } from 'firebase/firestore';
import {faCircleArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CrearProducto({ onAgregarProducto }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const productosCollection = collection(db, 'productos')
  const navigate = useNavigate();
  const {categorias} = useParams();

  const agregarProducto = async () => {
    if (nombre.trim() === '') {
      alert('Debe agregar un producto para continuar');
      return;
    }

    const nuevoProducto = {
      nombre,
      descripcion,
      precio,
      categorias,
    };
    try {
      const docRef = await addDoc(productosCollection, nuevoProducto);
      console.log('Producto agregada con ID: ', docRef.id);
      onAgregarProducto({ ...nuevoProducto, id: docRef.id });
      navigate('/Productos');
      setNombre('');
      setDescripcion('');
      setPrecio('');
    } catch (error) {
      console.error('Error al agregar el producto: ', error);
    }
    
  };
  

  return (
    <>
      <div>
          <Link to="/Productos">
            <FontAwesomeIcon className='botonVolver' icon={faCircleArrowLeft} size="lg" style={{ color: "#060709", }} />
          </Link>
        </div>
      
      <div>
        <h1>Producto</h1>
      </div>
      
      <div className='input'>
        <input type='text' placeholder='Nombre' value={nombre} onChange={(e) => setNombre(e.target.value)}/>
      </div>
      
      <div className='input'>
        <input type='text' placeholder='Descripcion' value={descripcion} onChange={(e) => setDescripcion(e.target.value)}/>
      </div>
      
      <div className='input'>
        <input type='number' placeholder='Precio' value={precio} onChange={(e) => setPrecio(e.target.value)}/>
      </div>
      
      <div className="botones">
        <div className="boton-guardar-container">
          <Link to="/Pedidos">
            <button
              className="btn btn-primary button buttonNuevoPedido"
              onClick={agregarProducto}>Guardar</button>
          </Link>
        </div>
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

export default CrearProducto;