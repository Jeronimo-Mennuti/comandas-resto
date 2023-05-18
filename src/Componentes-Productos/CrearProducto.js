import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { db } from '../ConfigFirebase/Firebase';
import { collection, addDoc } from 'firebase/firestore';
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CrearProducto({ onAgregarProducto }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const productosCollection = collection(db, 'productos')
  const navigate = useNavigate();
  const { categorias } = useParams();
  const [isChecked, setIsChecked] = useState(false);

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
  
  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div>
        <Link to="/Categorias">
          <FontAwesomeIcon className='BotonVolver' icon={faCircleArrowLeft} size="3x" />
        </Link>
      </div>

      <div>
        <h1 className="TituloComponentes">Producto</h1>
      </div>

      <div className='form-floating mb-3 input'>
        <input
          type='text'
          className="form-control"
          id="floatingInput"
          min="1"
          placeholder='Nombre'
          value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <label for="floatingInput">Nombre</label>
      </div>

      <div className='form-floating mb-3 input'>
        <input
          type='text'
          className="form-control"
          id="floatingInput"
          min="1"
          placeholder='Descripcion'
          value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        <label for="floatingInput">Descripcion</label>
      </div>

      <div className='form-floating mb-3 input'>
        <input
          type='text'
          className="form-control"
          id="floatingInput"
          min="1"
          placeholder='Precio'
          value={precio} onChange={(e) => setPrecio(e.target.value)} />
        <label for="floatingInput">Precio</label>
      </div>

      <label className="switch">
      <input type="checkbox" checked={isChecked} onChange={toggleSwitch} />
      <span className="slider"></span>
      <div className={`dot ${isChecked ? 'green' : 'red'}`}></div>
    </label>


      <div className='FooterComponentes'>

        <div className="BotonFooter">
          <Link to="/Categorias">
            <button
              className="btn btn-primary"
              onClick={agregarProducto}>Guardar</button>
          </Link>
        </div>

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

export default CrearProducto;