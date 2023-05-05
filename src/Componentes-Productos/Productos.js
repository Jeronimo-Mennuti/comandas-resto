import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../ConfigFirebase/Firebase";
import { collection, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Productos() {
  const [productos, setProductos] = useState([]);
  const { categorias } = useParams();
  console.log(categorias)

  useEffect(() => {
    async function fetchProductos() {
      const productosCollection = collection(db, "productos");
      const queryProductos = query(productosCollection, where("categorias", "==", categorias));
      const productosSnapshot = await getDocs(queryProductos);
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
          <Link to="/Categorias">
            <FontAwesomeIcon className='botonVolver' icon={faCircleArrowLeft} size="lg" style={{ color: "#060709", }} />
          </Link>
        </div>

        <div>
          <h1 className='tituloProductos'>Productos</h1>
        </div>

        <div>
          <Link to={`/CrearProducto/${categorias}`}>
            <button className="btn btn-primary buttonNuevoPedido botonMas">
              <i className="fas fa-plus"></i>
              
            </button>
          </Link>
        </div>
      </div>
      
      <div className="CardProductosContainer">
        {productos.length > 0 && (
          <div className='cardProductos'>
            {productos.map((productos) => (
              <div className="card" key={productos.id}>
                <div className="card-body">
                  <h5 className="CardProductosNombreProducto">{productos.nombre}</h5>
                  <p className="cardProductosPrecio">${productos.precio}</p>
                
                  <div className="botonesCardProductos">
                  
                    <Link to={`/EditarProducto/${productos.id}`}>
                      <i className="fas fa-edit botonEditarProducto"></i>

                    </Link>
                    <i className="fa-regular fa-circle-xmark botonEliminarProducto" onClick={() => eliminarProducto(productos.id)}></i>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="nuevoBotonContainer">
  <Link to="/CrearProducto">
    <button className="btn btn-primary buttonNuevoPedido cardCategorias botonNuevoProducto">
      <i className="fas fa-plus"></i>
       Nuevo Producto
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
  );
}

export default Productos;
