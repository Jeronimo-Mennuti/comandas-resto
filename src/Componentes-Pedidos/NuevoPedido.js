//al apretar en el boton guardar se guarden los datos de los inputs en Pedidos.js

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
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
      <div className="card mx-auto w-75 my-2 row" key={producto.id}>
        <i className="fa-regular fa-circle-xmark botonEliminarProducto" onClick={eliminarProductoTrash} style={{ cursor: "pointer" }} ></i>
        <h5 className="nombreProducto">{producto.nombre}</h5>
        <p className="precioProducto">${precioActualizado}</p>

        <div className='d-flex botonesCantidad'>
          <i class="bi bi-dash-square botonMenosCard" onClick={eliminarProducto} style={{ cursor: "pointer" }}></i>
          <p className="numeroCantidad">
            {cantidad > 0 && <div className="mx-2">{cantidad}</div>}
          </p>
          <i class="bi bi-plus-square botonMasCard" onClick={agregarProducto} style={{ cursor: "pointer" }}></i>
        </div>
      </div>
    );
  };

  return (
    <>
      <div>
        
      <div className='HeaderComponentes'>
          <Link to="/Pedidos">
          <FontAwesomeIcon className='BotonVolver' icon={faCircleArrowLeft} size= "3x"/>
          </Link>
        </div>

        <div className="">
          <h1 className='TituloComponentes'>Nuevo Pedido</h1>
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
          id="floatingInput"
          min="1"
          value={comensales}
          onChange={(e) => setComensales(e.target.value)}
          placeholder="Comensales"
        />
        <label for="floatingInput">Comensales</label>
      </div>

      <div className="form-floating mb-3 input">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          placeholder="Agregar Nota"
        />
        <label for="floatingInput">Agregar Nota</label>
      </div>

      <div className="form-floating mb-3 input">
        <input
          type="text"
          className="form-control"
          placeholder="Agregar Producto"
          id="floatingInput"
          onChange={handleInputChange}
          value={textoBusqueda}
        />
        <label for="floatingInput">Agregar Producto</label>
        {sugerencias.length > 0 && (
          <ul className="sugerencias-lista">
            {sugerencias.map((sugerencia) => (
              <div className="card sugerencia-card" key={sugerencia.id} onClick={() => handleAgregarProducto(sugerencia)}>
              <div className="card-body">
                {sugerencia.nombre}
              </div>
            </div>
            ))}
          </ul>
        )}
      </div>

      <div>
        {productosSeleccionados.map((producto) => renderizarProducto(producto))}
      </div>

      <div className='FooterComponentes'>

        <div className="BotonFooter">
          <Link to="/Pedidos">
            <button
              className="btn btn-primary"
              onClick={handleGuardarPedido}
            >
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
  );
}

export default NuevoPedido;
