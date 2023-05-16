//no funcionan los botones '+' '-' y trash
//(EditarProducto.js) al editar un producto lo edita pero no borra el anterior



import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { db } from "../ConfigFirebase/Firebase";
import { useNavigate, useParams } from "react-router-dom";

function EditarPedido({ onActualizarPedido }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nota, setNota] = useState("");
  const [comensales, setComensales] = useState("");
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [productosNuevos, setProductosNuevos] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [numeroMesa, setNumeroMesa] = useState("");
  const pedidosCollection = collection(db, "pedidos");
  const [pedidos, setPedidos] = useState([]);
  const [isOpen, setIsOpen] = useState([]);

  const handleToggleCollapse = (index) => {
    setIsOpen((prevState) => {
      const newState = { ...prevState };
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleGuardarPedido = async (pedidoId, pedidoSeleccionado) => {
    setNumeroMesa(pedidoSeleccionado.numeroMesa);
    setComensales(pedidoSeleccionado.comensales);
    setNota(pedidoSeleccionado.nota);

    const pedidoActualizado = {
      numeroMesa: numeroMesa,
      comensales: comensales,
      nota: nota,
    };

    if (numeroMesa.trim() === "") {
      alert("Debe agregar un producto para continuar");
      return;
    }

    try {
      await updateDoc(doc(pedidosCollection, pedidoId), pedidoActualizado);
      console.log("Pedido actualizado con ID: ", pedidoId);
      onActualizarPedido({ ...pedidoActualizado, id: pedidoId });
      navigate("/Pedidos");
      setNumeroMesa("");
      setComensales("");
      setNota("");
    } catch (error) {
      console.error("Error al actualizar el pedido: ", error);
    }
  };

  const buscarSugerencias = (texto) => {
    if (texto === "") {
      setSugerencias([]);
      return;
    }
    const coincidencias = productosNuevos.filter((producto) => {
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

      <div className="card mx-auto w-100 my-2 row" key={producto.id}>
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

  const PedidoById = async (id) => {
    const pedido = await getDoc(doc(db, "pedidos", id));
    if (pedido.exists()) {
      setNumeroMesa(pedido.data().numeroMesa);
      setNota(pedido.data().nota);
      setComensales(pedido.data().comensales);
      setProductos(pedido.data().productosSeleccionados);
      fetchProductos();
    } else {
      console.log("El pedido no existe");
    }
  };

  const fetchProductos = async () => {
    const productosCollection = collection(db, "productos");
    const productosSnapshot = await getDocs(productosCollection);
    const productosData = productosSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProductosNuevos(productosData);
  };

  const update = async (e) => {
    e.preventDefault();
    const pedido = doc(db, "pedidos", id);
    const data = {
      nota: nota,
      numeroMesa: numeroMesa,
      comensales: comensales,
      productos: productos,
    };
    await updateDoc(pedido, data);
    navigate("/pedidos");
  };

  useEffect(() => {
    PedidoById(id);
  }, []);

  console.log("as", productos);


  return (
    <>
      <div className='HeaderComponentes'>
        <Link to="/Pedidos">
          <FontAwesomeIcon className='BotonVolver' icon={faCircleArrowLeft} size="3x" />
        </Link>
      </div>

      <div>
        <h1 className='TituloComponentes'>Datos del Pedido</h1>
      </div>

      <div className="form-floating mb-3 input">
        <input
          type='number'
          className="form-control"
          id="floatingInput"
          min="1"
          placeholder="Numero Mesa"
          value={numeroMesa}
          onChange={(e) => setNumeroMesa(e.target.value)} />
        <label for="floatingInput">Numero Mesa</label>
      </div>

      <div className="form-floating mb-3 input">
        <input
          type='number'
          className="form-control"
          id="floatingInput"
          min="1"
          placeholder="Comensales"
          value={comensales}
          onChange={(e) => setComensales(e.target.value)} />
        <label for="floatingInput">Comensales</label>
      </div>

      <div className="form-floating mb-3 input">
        <input
          type='text'
          className="form-control"
          id="floatingInput"
          min="1"
          placeholder="Agregar Nota"
          value={nota}
          onChange={(e) => setNota(e.target.value)} />
        <label for="floatingInput">Agregar Nota</label>
      </div>

      <div className="form-floating mb-3 input">
        <input
          type='text'
          className="form-control"
          id="floatingInput"
          min="1"
          placeholder="Agregar Producto"
          onChange={handleInputChange}
          value={textoBusqueda} />
        <label for="floatingInput">Agregar Producto</label>

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

      <div className="card mx-auto w-75 my-3 cardCompleta" key={pedidos.id}>
        <div className="card-header">

          <div className='d-flex mx-auto my-1 '>
            <h4 className="card-title d-flex justify-content-center">
              Mesa
            </h4>
          </div>

          <button
            className="btn btn-link btn-collapse"
            data-parent="#accordion"
            data-toggle="collapse"
            role="button"
            data-delay="1000"
            data-interval="1000"
            onClick={() => handleToggleCollapse()}>
            <i className="fas fa-chevron-down"></i>
          </button>
        </div>

        {productos.length > 0 && (
          <div className="card-body">
            {productos.map((producto) => (
              <div className="card mx-auto w-100 my-2 row" key={producto.id}>

                <i className="fa-regular fa-circle-xmark botonEliminarProducto" style={{ cursor: "pointer" }}></i>
                <div className='d-flex nombreYCantidad'>
                  <h5 className="nombreProducto">{producto.nombre} </h5>

                  <div className='d-flex botonesCantidad'>
                    <i class="bi bi-dash-square botonMenosCard" style={{ cursor: "pointer" }}></i>

                    <p className='numeroCantidad'>{producto.cantidad > 0 ? producto.cantidad : "1"}</p>

                    <i class="bi bi-plus-square botonMasCard" style={{ cursor: "pointer" }}></i>
                  </div>

                </div>

                <p className="precioProducto">
                  {producto.cantidad >= 1 ? '$' + producto.precio * producto.cantidad : '$' + producto.precio}
                </p>

              </div>
            ))}
          </div>
        )}

        <div className="card-footer d-flex justify-content-center" />

      </div>


      <div className='FooterComponentes'>

        <div className="BotonFooter">
          <Link to="/Pedidos">
            <button
              className="btn btn-primary"
              onClick={update}
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

export default EditarPedido;
