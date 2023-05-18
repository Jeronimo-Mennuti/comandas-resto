//error al editar productos y apretar guardar no se guarda lo editado.
//problemas al apretar boton volver atras con categorias creadas.
//botones de categoria y eliminar no funcionan en Pedidos.js

//agregar EditarCategoria.
//funcionalidad al boton de disponible en productos.
//agregar un boton check que envie los datos del pedido al historial.


import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { db } from "../ConfigFirebase/Firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [isOpen, setIsOpen] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  


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

      <div className="card-container">
      {pedidos.map((pedido, index) => (
        <div className="card mx-auto w-75 my-3 cardCompleta" key={pedido.id}>
          <div className="card-header">

            <div className='d-flex mx-auto my-1 '>
              <h4 className="card-title d-flex justify-content-center">
                Mesa {pedido.numeroMesa}
              </h4>
              <h5 className='card-title cardTotal'> (${calcularTotal(pedido.productosSeleccionados)})</h5>
            </div>

            <button
              className="btn btn-link btn-collapse"
              data-parent="#accordion"
              data-toggle="collapse"
              role="button"
              data-target={`#info-${pedido.id}`}
              aria-expanded={isOpen[index]}
              aria-controls={`info-${pedido.id}`}
              data-delay="1000"
              data-interval="1000"
              onClick={() => handleToggleCollapse(index)}>
              <i className="fas fa-chevron-down"></i>
            </button>
          </div>

          <div id={`info-${pedido.id}`} className={`collapse ${isOpen[index] ? "show" : ""}`}>
            {pedido.productosSeleccionados && pedido.productosSeleccionados.length > 0 && (
              <div className="card-body">
                {pedido.productosSeleccionados.map((productos) => (
                  
                  <div className="card mx-auto w-100 my-2 row " key={productos.id}>
                    <i className="fa-regular fa-circle-xmark botonEliminarProducto" style={{ cursor: "pointer" }} ></i>
                    
                    
                    <h5 className='nombreProducto'>{productos.nombre}</h5>
                    <p className='precioProducto'>
                      {productos.cantidad >= 1 ? '$' + productos.precio * productos.cantidad : '$' + productos.precio}
                    </p>
                    
                    <div className='d-flex botonesCantidad'>
                    <i class="bi bi-dash-square botonMenosCard" style={{ cursor: "pointer" }}></i>
                      <h5 className='numeroCantidad mx-2'>{productos.cantidad > 0 ? productos.cantidad : "1"}</h5>
                      <i class="bi bi-plus-square botonMasCard" style={{ cursor: "pointer" }}></i>
                  </div>
                  
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card-footer d-flex justify-content-center">
            <i onClick={() => eliminarPedidos(pedido.id)} className="fa-regular fa-circle-xmark" style={{ color: 'white', marginRight: '8px', marginTop: '5px' }}></i>
            <Link to={`/EditarPedido/${pedido.id}`}>
              <i className="fas fa-edit" style={{ color: 'white', marginRight: '8px' }}></i>
            </Link>
          </div>
        </div>
      ))}
</div>
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

