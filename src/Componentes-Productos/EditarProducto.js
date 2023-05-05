import {collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { db } from "../ConfigFirebase/Firebase";
import { useNavigate, useParams } from "react-router-dom";
import { faCirclePlus, faMinusCircle, faCircleArrowLeft, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EditarProducto({ onAgregarProducto }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [nombre, setNombre] = useState("");
  const productosCollection = collection(db, 'productos')
 
  
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

  // const handleButton = () => {
  //   navigate("/productos");
  // };

  useEffect(() => {
    ProductById(id);
  }, []);

  return (
    <>
    <div>
          <Link to="/Productos">
            <FontAwesomeIcon className='botonVolver' icon={faCircleArrowLeft} size="lg" style={{ color: "#060709", }} />
          </Link>
        </div>
        <div>
          <h1>
            Editar Producto
          </h1>
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
          <Link to="/Productos">
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
  );
}

export default EditarProducto;
