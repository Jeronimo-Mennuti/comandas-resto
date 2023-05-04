//al apretar en el boton guardar se guarden los datos de los inputs en Pedidos.js

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faMinusCircle, faCircleArrowLeft, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../ConfigFirebase/Firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

function NuevoPedido({ onAgregarPedido }) {
  const [productos, setProductos] = useState([]);
  const [sugerencias, setSugerencias] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [numeroMesa, setNumeroMesa] = useState("");
  const [comensales, setComensales] = useState("");
  const [nota, setNota] = useState("");
  const pedidosCollection = collection(db, "pedidos");
  const navigate = useNavigate();

  const handleGuardarPedido = async () => {
    if (numeroMesa.trim() === "") {
      alert("Complete todos los campos");
      return;
    }
    const nuevoPedido = {
      numeroMesa,
      comensales,
      nota,
      productosSeleccionados,
    };
    try {
      const docRef = await addDoc(pedidosCollection, nuevoPedido);
      console.log("Pedido agregado con ID: ", docRef.id);
      onAgregarPedido({ ...nuevoPedido, id: docRef.id });
      navigate("/Pedidos");
      setNumeroMesa("");
      setComensales("");
      setNota("");
    } catch (error) {
      console.error("Error al agregar el pedido: ", error);
    }
  };

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

  const buscarSugerencias = (texto) => {
    if (texto === "") {
      setSugerencias([]);
      return;
    }
    const coincidencias = productos.filter((producto) => {
      return producto.nombre.toLowerCase().includes(texto.toLowerCase());
    });
    setSugerencias(coincidencias);
  };

  const handleInputChange = (event) => {
    const texto = event.target.value;
    setTextoBusqueda(texto);
    buscarSugerencias(texto);
  };

  const handleAgregarProducto = (producto) => {
    setProductosSeleccionados([...productosSeleccionados, producto]);
    setTextoBusqueda("");
    setSugerencias([]);
  };

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
      <div className="card producto-card" key={producto.id}>
        <div className="card-body">
        <div className="d-flex align-items-center Cantidad">
            
            <div className="ButtonCantidad">
              <FontAwesomeIcon
                icon={faCirclePlus}
                onClick={agregarProducto}
                size="xl"
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
                size="xl"
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <h5 className="card-title text-center">{producto.nombre}</h5>

          <p className="card-description text-center">
            ({producto.descripcion})
          </p>

          <p className="card-price text-center">${precioActualizado}</p>

          

          <div className="trash-icon-container">
            <FontAwesomeIcon
              icon={faTimesCircle}
              onClick={eliminarProductoTrash}
              size="xl"
              style={{
                cursor: "pointer",
                position: "absolute",
                top: 10,
                right: 15,
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div>
        <div>
          <Link to="/Pedidos">
            <FontAwesomeIcon
              className="botonVolver"
              icon={faCircleArrowLeft}
              size="lg"
              style={{ color: "#060709" }}
            />
          </Link>
        </div>

        <div className="tituloComponentes">
          <h1>Nuevo Pedido</h1>
        </div>
      </div>

      <div className="form-floating mb-3 input">
        <input
          type="Number"
          className="form-control"
          id="floatingInput"
          min="1"
          value={numeroMesa}
          onChange={(e) => setNumeroMesa(e.target.value)}
          placeholder="Numero Mesa"
        />
        <label for="floatingInput">NumeroMesa</label>
      </div>

      <div className="form-floating mb-3 input">
        <input
          type="Number"
          className="form-control"
          id="floatingPassword"
          min="1"
          value={comensales}
          onChange={(e) => setComensales(e.target.value)}
          placeholder="Comensales"
        />
        <label for="floatingPassword">Comensales</label>
      </div>

      <div className="form-floating mb-3 input">
        <input
          type="text"
          className="form-control"
          id="floatingPassword"
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          placeholder="Agregar Nota"
        />
        <label for="floatingPassword">Agregar Nota</label>
      </div>

      <div className="form-floating mb-3 input">
        <input
          type="text"
          placeholder="Agregar Producto"
          id="floatingPassword"
          onChange={handleInputChange}
          value={textoBusqueda}
        />
        {sugerencias.length > 0 && (
          <ul className="sugerencias-lista">
            {sugerencias.map((sugerencia) => (
              <li
                key={sugerencia.id}
                onClick={() => handleAgregarProducto(sugerencia)}
              >
                {sugerencia.nombre}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        {productosSeleccionados.map((producto) => renderizarProducto(producto))}
      </div>

      <div className="botones">
        <div className="boton-guardar-container">
          <Link to="/Pedidos">
            <button
              className="btn btn-primary button buttonNuevoPedido"
              onClick={handleGuardarPedido}
            >
              Guardar
            </button>
          </Link>
        </div>
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
    </>
  );
}

export default NuevoPedido;
