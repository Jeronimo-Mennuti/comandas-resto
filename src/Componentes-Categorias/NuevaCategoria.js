import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../ConfigFirebase/Firebase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { collection, addDoc } from 'firebase/firestore';



function NuevaCategoria(onAgregarCategoria) {
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
      <div className='HeaderComponentes'>
        <Link to="/Categorias">
        <FontAwesomeIcon className='BotonVolver' icon={faCircleArrowLeft} size= "3x"/>
        </Link>
      </div>
      
      <div>
        <h1 className='TituloComponentes'>Crear Categoria</h1>
      </div>
      
      <div className='form-floating mb-3 input'>
        <input 
        type='text'
        className="form-control"
        id="floatingInput"
        min="1"  
        value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <label for="floatingInput">Nombre</label>
      </div>
      
      <div className='form-floating mb-3 input'>
        <input 
        type='text'
        className="form-control"
        id="floatingInput"
        min="1"  
        value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        <label for="floatingInput">Descripcion</label>
      </div>


      <div className='FooterComponentes'>

        <div className="BotonFooter">
          <Link to="/Categorias">
            <button
              className="btn btn-primary"
              onClick={agregarCategoria}>
              Guardar
            </button>
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

export default NuevaCategoria;
