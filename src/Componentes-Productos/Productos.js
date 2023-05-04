import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../ConfigFirebase/Firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function fetchProductos() {
      const productosCollection = collection(db, "productos");
      const productosSnapshot = await getDocs(productosCollection);
      const productosData = productosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(productosData);
    }
    fetchProductos();
  }, []);

  async function eliminarProducto(id) {
    try {
      console.log("Eliminando producto con ID:", id);
      const docRef = doc(db, "productos", String(id));
      await deleteDoc(docRef);
      console.log("Producto eliminado de la colección en Firebase");

      // obtener los productos actualizados de Firebase
      const productosSnapshot = await getDocs(collection(db, "productos"));
      const productosActualizados = productosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // actualizar el estado local con la nueva lista de productos
      setProductos(productosActualizados);
      console.log("Producto eliminado del estado local");
    } catch (error) {
      console.error("Error al eliminar el producto: ", error);
      alert("Error al eliminar el producto: " + error.message);
    }
  }
  return (
    <>
      <div className='headerProductos'>
        <div>
          <Link to="/Pedidos">
            <FontAwesomeIcon className='botonVolver' icon={faCircleArrowLeft} size="lg" style={{ color: "#060709", }} />
          </Link>
        </div>
        
        <div>
          <h1>Productos</h1>
        </div>
        
        <div>
          <Link to="/CrearProducto">
            <button className="btn btn-primary buttonNuevoPedido">
              <i className="fas fa-plus"></i>
              Nuevo
            </button>
          </Link>
        </div>
        </div>
      
      <div className="productos-container">
        {productos.length > 0 && (
          <div className="card-container">
            {productos.map((productos) => (
              <div className="card producto-card" key={productos.id}>
                <div className="card-body">
                  <h5 className="card-title text-center">{productos.nombre}</h5>
                  <p className="card-description text-center">
                    ({productos.descripcion})
                  </p>
                  <p className="card-price text-center">${productos.precio}</p>
                  <div className="d-flex justify-content-between botonesCard">
                  <Link to={`/EditarProducto/${productos.id}`}>
                      <button className="btn btn-success boton-producto">
                        <i className="fas fa-edit"></i>
                      </button>
                    </Link>
                    <button
                      onClick={() => eliminarProducto(productos.id)}
                      className="btn btn-danger boton-producto btn-md"
                    >
                      <i className="fa-regular fa-circle-xmark"></i>
                    </button>
                  </div>
                </div>
              </div>
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

              <Link to="/Productos">Productos <i className="fas fa-shopping-bag"></i></Link>
            </li>
            <li>
              <Link to="/Historial">Historial <i className="fas fa-history"></i></Link>
            </li>
            <li>
              <Link to="/Inventario">Inventario <i className="fas fa-box-open"></i></Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Productos;
