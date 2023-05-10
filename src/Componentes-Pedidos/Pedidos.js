import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrash, faMinusCircle, faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { db } from "../ConfigFirebase/Firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Collapse } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [isOpen, setIsOpen] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);


  const handleToggleCollapse = (index) => {
    setIsOpen((prevState) => {
      const newState = { ...prevState };
      newState[index] = !newState[index];
      return newState;
    });
  };

  useEffect(() => {
    async function fetchPedidos() {
      const pedidosCollection = collection(db, "pedidos");
      const pedidosSnapshot = await getDocs(pedidosCollection);
      const pedidosData = pedidosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPedidos(pedidosData);
    }
    fetchPedidos();
  }, []);

  async function eliminarPedidos(id) {
    try {
      console.log("Eliminando pedido con ID:", id);
      const docRef = doc(db, "pedidos", String(id));
      await deleteDoc(docRef);
      console.log("Pedido eliminado de la colección en Firebase");

      // obtener los pedidos actualizados de Firebase
      const pedidosSnapshot = await getDocs(collection(db, "pedidos"));
      const pedidosActualizados = pedidosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // actualizar el estado local con la nueva lista de pedidos
      setPedidos(pedidosActualizados);
      console.log("Pedido eliminado del estado local");
    } catch (error) {
      console.error("Error al eliminar el pedido: ", error);
      alert("Error al eliminar el pedido: " + error.message);
    }
  }

  const renderizarProducto = (producto) => {
    const index = productosSeleccionados.findIndex((p) => p.id === producto.id);
    const cantidad = productosSeleccionados[index]?.cantidad || 1;
    const precioActualizado = (producto.precio * cantidad).toFixed(2);

    const agregarProducto = () => {
      const newProductosSeleccionados = [...productosSeleccionados];
      newProductosSeleccionados[index].cantidad =
        (newProductosSeleccionados[index].cantidad || 0) + 1;
      setProductosSeleccionados(newProductosSeleccionados);
    };

    const eliminarProducto = () => {
      const newProductosSeleccionados = [...productosSeleccionados];
      newProductosSeleccionados[index].cantidad =
        newProductosSeleccionados[index].cantidad <= 1
          ? 1
          : newProductosSeleccionados[index].cantidad - 1;
      setProductosSeleccionados(newProductosSeleccionados);
    };

    const eliminarProductoTrash = () => {
      const newProductosSeleccionados = productosSeleccionados.filter(
        (producto, i) => i !== index
      );
      setProductosSeleccionados(newProductosSeleccionados);
    };

  };

  function calcularTotal(productosSeleccionados) {
    let total = 0;
    productosSeleccionados.forEach((producto) => {
      console.log(producto.cantidad);
      const cantidad = parseInt(producto.cantidad) || 1;
      const precio = parseFloat(producto.precio);
      console.log(cantidad, precio);
      if (!isNaN(cantidad) && !isNaN(precio)) {
        total += precio * cantidad;
      }
    });
    console.log(total);
    return total.toFixed(0);
  }


  return (
    <>
      <div className='HeaderComponentes'>

        <Link to="/NuevoPedido">
          <button className="btn btn-primary BotonMas">
            <i className="fas fa-plus"></i>
          </button>
        </Link>
      </div>

      <div >
        <h1 className="TituloComponentes">Pedidos</h1>
      </div>


      

        {pedidos.map((pedido, index) => (
          <div className="card mx-auto w-75 my-4 " key={pedido.id}>
            <div className="card-header">
              <h3 className="card-title d-flex justify-content-center">
                Mesa {pedido.numeroMesa}
              </h3>
              <button
                className="btn btn-link btn-collapse"
                data-parent="#accordion"
                data-toggle="collapse"
                role="button"
                data-target={`#info-${pedido.id}`}
                aria-expanded={isOpen[index]}
                aria-controls={`info-${pedido.id}`}
                data-delay="1000"
                data-interval="500"
                onClick={() => handleToggleCollapse(index)}
              >
                <i className="fas fa-chevron-down"></i>
              </button>
            </div>

            <div id={`info-${pedido.id}`} className={`collapse ${isOpen[index] ? "show" : ""}`}>
              {pedido.productosSeleccionados && pedido.productosSeleccionados.length > 0 && (
                <div className="card-body">
                  {pedido.productosSeleccionados.map((productos) => (
                    <div className="row" key={productos.id}>
                      <div className="col-3">
                        <div><h5>{productos.cantidad > 0 ? productos.cantidad : "1"}</h5></div>
                      </div>
                      <div className="col-3">
                        <p className="card-text">
                          {productos.nombre}
                        </p>
                      </div>
                      <div className="col-3">
                        <h4 className="card-text">
                          {productos.cantidad >= 1 ? '$' + productos.precio * productos.cantidad : '$' + productos.precio}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              )}



              <div className="card-text mb-3">
                <div className="row">
                  <div className="row">
                    <div className="card-text">comensales: {pedido.comensales}</div>
                  </div>
                  <div className="row">
                    <div className="card-text">Nota: {pedido.nota}.</div>
                  </div>
                  <div className="row">
                    <div className="card-text">Total del pedido: ${calcularTotal(pedido.productosSeleccionados)}</div>
                  </div>
                </div>
              </div>

            </div>

            <div className="card-footer d-flex justify-content-center">
              <button
                onClick={() => eliminarPedidos(pedido.id)}
                className="btn btn-danger btn-md"
              >
                <i className="fa-regular fa-circle-xmark"></i>
              </button>

              <button
                className="btn btn-success">
                <i className="fas fa-check"></i>
              </button>

              <Link to={`/EditarPedido/${pedido.id}`}>
                <button className="btn btn-success">
                  <i className="fas fa-edit"></i>
                </button>
              </Link>
            </div>
          </div>
        ))}










        <div className='FooterComponentes'>

          <div className="BotonFooter">
            <Link to="/NuevoPedido">
              <button className="btn btn-primary">
                <i className="fas fa-plus"></i>
                Nuevo Pedido
              </button>
            </Link>
          </div>

          <div>
            <nav className='NavBar'>
              <ul>
                <li>
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

export default Pedidos;

