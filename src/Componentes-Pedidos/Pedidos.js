//agregar botones al lado del nombre del producto dentro de la card de pedidos para saber si es comida o bebida y asi mandarlo a sus respectivos lugares
//crear un historial de platos y bebidas vendidas.
//en sugerencias para agregar productos agregar categorias
//agregar input de categoria (bebida o comida)
//agregar el numero de pedidos activos.



import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrash, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
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
  const [completedPedidos, setCompletedPedidos] = useState([]);

  const handleCompletePedido = (pedidoId) => {
    const completedPedido = pedidos.find(pedido => pedido.id === pedidoId);
    setPedidos(pedidos.filter(pedido => pedido.id !== pedidoId));
    setCompletedPedidos([...completedPedidos, completedPedido]);
  };


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

    
    return (
      <div className="container">
        <div className="card producto-card" key={producto.id}>
          <div className="card-body">
            <h5 className="card-title text-center">{producto.nombre}</h5>
            <p className="card-description text-center">
              ({producto.descripcion})
            </p>

            <p className="card-price text-center">${precioActualizado}</p>

            <div className="d-flex align-items-center justify-content-between">
              <div>
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  onClick={agregarProducto}
                  size="2x"
                  style={{ cursor: "pointer" }}
                />
              </div>

              {cantidad > 0 && (
                <div className="mx-2 numeroCantidad">{cantidad}</div>
              )}

              <div>
                <FontAwesomeIcon
                  icon={faMinusCircle}
                  onClick={eliminarProducto}
                  size="2x"
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>

            <div className="trash-icon-container iconoTrash">
              <FontAwesomeIcon
                icon={faTrash}
                onClick={eliminarProductoTrash}
                size="xl"
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
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
      <div className="col">
        <div>
          <Link to="/NuevoPedido">
            <button className="btn btn-primary buttonNuevoPedido">
              <i className="fas fa-plus"></i>
              Nuevo
            </button>
          </Link>
        </div>
        <div className="tituloComponentes">
          <h1>Pedidos</h1>
        </div>

        <div className="pedidoscontainer">
          {pedidos.map((pedido, index) => (
            <div className="card card-personalizada col-md-6" key={pedido.id}>
              <div className="card-header d-flex">
                <div className="col">
                  <h1 className="card-title text-center mb-0">
                    Mesa {pedido.numeroMesa}
                  </h1>
                </div>

                <div className="col-auto">
                  <a
                    href={`#info-${pedido.id}`}
                    className="btn btn-link"
                    data-toggle="collapse"
                    role="button"
                    aria-expanded={isOpen[index]}
                    aria-controls={`info-${pedido.id}`}
                    onClick={() => handleToggleCollapse(index)}
                  >
                    <i className="fas fa-chevron-down"></i>
                  </a>
                </div>
              </div>

              <div className="card-body row" style={{ padding: "0" }}>
                <Collapse in={isOpen[index]}>
                  <div>
                    {pedido.productosSeleccionados && pedido.productosSeleccionados.length > 0 && (
                      <div className="card-container">
                        {pedido.productosSeleccionados.map((productos) => (
                          <div className="card producto-card" key={productos.id}>
                            <div className="card-body">
                              <div><h5>{productos.cantidad > 0 ? productos.cantidad : "1"}</h5></div>
                              <h5 className="card-title text-center">
                                {productos.nombre}
                              </h5>
                              <h4 className="card-price text-center">
                                {productos.cantidad >= 1 ? '$' + productos.precio * productos.cantidad : '$' + productos.precio}
                              </h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="descripcionCard">
                      <div>Numero de comensales: {pedido.comensales}</div>
                      <div>Nota del pedido: {pedido.nota}.</div>
                      <div>Total del pedido: ${calcularTotal(pedido.productosSeleccionados)}</div>
                    </div>

                  </div>
                </Collapse>
              </div>

              <div className="card-footer d-flex rounded-top justify-content-center">
                <div className="d-flex botonesCard">
                  
                  <button
                    onClick={() => eliminarPedidos(pedido.id)}
                    className="btn btn-danger boton-producto btn-md"
                  >
                    <i className="fa-regular fa-circle-xmark"></i>
                  </button>

                  
                  <button
                    className="btn btn-success boton-producto"
                    onClick={() => handleCompletePedido(pedido.id)}
                  >
                    <i className="fas fa-check"></i>
                  </button>
                
                  
                  <Link to={`/EditarPedido/${pedido.id}`}>
                    <button className="btn btn-success boton-producto">
                      <i className="fas fa-edit"></i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <nav>
            <ul>
              <li>
                <Link to="/Pedidos">
                  Pedidos <i className="fas fa-clipboard-list"></i>
                </Link>
              </li>
              <li>
                <Link to="/Productos">
                  Productos <i className="fas fa-shopping-bag"></i>
                </Link>
              </li>
              <li>
                <Link to="/Historial">
                  Historial <i className="fas fa-history"></i>
                </Link>
              </li>
              <li>
                <Link to="/Inventario">
                  Inventario <i className="fas fa-box-open"></i>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Pedidos;
