import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { db } from "../ConfigFirebase/Firebase";
import { useNavigate, useParams } from "react-router-dom";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function EditarProducto({ onAgregarProducto }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [nombre, setNombre] = useState("");
  const productosCollection = collection(db, 'productos');
 



  const agregarProducto = async () => {
    if (nombre.trim() === '') {
      alert('Debe agregar un producto para continuar');
      return;
    }

    const nuevoProducto = {
      nombre,
      descripcion,
      precio,
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


  const ProductById = async (id) => {
    const product = await getDoc(doc(db, "productos", id));
    if (product.exists()) {
      setDescripcion(product.data().descripcion);
      setNombre(product.data().nombre);
      setPrecio(product.data().precio);
    } else {
      console.log("El producto no existe");
    }
  };

  const update = async (e) => {
    e.preventDefault();
    const product = doc(db, "productos", id);
    const data = {
      descripcion: descripcion,
      nombre: nombre,
      precio: parseFloat(precio),
    };
    await updateDoc(product, data);
    navigate("/productos");
  };

  useEffect(() => {
    ProductById(id);
  }, []);



  return (
    <>
      <div>
      <Link to="/Categorias">
          <FontAwesomeIcon className='BotonVolver' icon={faCircleArrowLeft} size="3x" />
        </Link>
      </div>
      <div >
        <h1 className="TituloComponentes">
          Editar Producto
        </h1>
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
          type='number'
          className="form-control"
          id="floatingInput"
          min="1"
          placeholder='Precio'
          value={precio} onChange={(e) => setPrecio(e.target.value)} />
        <label for="floatingInput">Precio</label>
      </div>
      
      <div className='FooterComponentes'>

        <div className="BotonFooter">
          <Link to="/Productos">
            <button
              className="btn btn-primary "
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
  );
}

export default EditarProducto;
