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
      <div className='HeaderComponentes'>

        <Link to="/Categorias">
          <FontAwesomeIcon className='BotonVolver' icon={faCircleArrowLeft} size="3x" />
        </Link>


        <Link to={`/CrearProducto/${categorias}`}>
          <button className="btn btn-primary BotonMas">
            <i className="fas fa-plus"></i>
          </button>
        </Link>
      </div>

      <div>
        <h1 className="TituloComponentes">Articulos de {categorias}</h1>
      </div>




      <div className="">
        {productos.length > 0 && (
          <div className=''>
            {productos.map((productos) => (
              <div className="card mx-auto w-50 my-4" style={{ height: '78px'}} key={productos.id}>

                <h6  style={{ marginLeft: '8px',marginTop: '10px', fontWeight:'bold' }}>{productos.nombre}</h6>
                <p  style={{ marginLeft: '8px' }}>${productos.precio}</p>

                <div className="position-absolute top-0 end-0">
                  <Link to={`/EditarProducto/${productos.id}`}>
                    <i className="fas fa-edit" style={{ color: 'black', marginRight: '8px' }}></i>

                  </Link>
                  <i className="fa-regular fa-circle-xmark" style={{ marginRight: '8px', cursor: 'pointer'}} onClick={() => eliminarProducto(productos.id)}></i>
                </div>

              </div>

            ))}
          </div>
        )}
      </div>

      <div className='FooterComponentes'>

        <div className="BotonFooter">
          <Link to={`/CrearProducto/${categorias}`}>
            <button className="btn btn-primary">
              <i className="fas fa-plus"></i>
              Nuevo Producto
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
  );
}

export default Productos;
