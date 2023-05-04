//quiero que al entrar en editarPedido se rendericen los productos del pedido
//no funcionan los botones '+' '-' y trash
//(EditarProducto.js) al editar un producto lo edita pero no borra el anterior



import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCirclePlus, faMinusCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
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
      <div className="card producto-card" key={producto.id}>
        <div className="card-body">
          <h5 className="card-title text-center">{producto.nombre}</h5>

          <p className="card-price text-center">${precioActualizado}</p>

          <div className="d-flex align-items-center Cantidad">
            <div className="ButtonCantidad">
              <FontAwesomeIcon
                icon={faCirclePlus}
                onClick={agregarProducto}
                size="xl"
                style={{ cursor: "pointer" }}
              />
            </div>

            {cantidad > 0 && <div className="mx-2">{cantidad}</div>}

            <div>
              <FontAwesomeIcon
                icon={faMinusCircle}
                onClick={eliminarProducto}
                size="xl"
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>

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
      <div>
        <h1>Datos del Pedido</h1>
      </div>
      <div className="input">
        <input
          type="number"
          placeholder="Numero Mesa"
          min="1"
          value={numeroMesa}
          onChange={(e) => setNumeroMesa(e.target.value)}
        />
      </div>
      <div className="input">
        <input
          type="number"
          placeholder="Comensales"
          min="1"
          value={comensales}
          onChange={(e) => setComensales(e.target.value)}
        />
      </div>
      <div className="input">
        <input
          type="text"
          placeholder="Agregar Nota"
          value={nota}
          onChange={(e) => setNota(e.target.value)}
        />
      </div>

      <div className="input">
        <input
          type="text"
          placeholder="Agregar Producto"
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

      <div className="productos-container">
        {productos.length > 0 && (
          <div className="card-container">
            {productos.map((productos) => (
              <div className="card producto-card" key={productos.id}>
                <div className="card-body">
                  <div className="d-flex align-items-center Cantidad">
                    
                    <div className="ButtonCantidad">
                      <FontAwesomeIcon
                        icon={faCirclePlus}
                      
                        size="xl"
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <div><h5>{productos.cantidad > 0 ? productos.cantidad : "1"}</h5></div>
                    <div className="mx-2"></div>

                    <div>
                      <FontAwesomeIcon
                        icon={faMinusCircle}

                        size="xl"
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>
                  <h5 className="card-title text-center">{productos.nombre}</h5>

                  <h4 className="card-price text-center">
                    {productos.cantidad >= 1 ? '$' + productos.precio * productos.cantidad : '$' + productos.precio}
                  </h4>




                  <div className="d-flex justify-content-between botonesCard">
                    <div className="trash-icon-container">
                      <FontAwesomeIcon
                        icon={faTimesCircle}
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
              </div>
            ))}
          </div>
        )}
      </div>



      <div className="botones">
        <div className="boton-guardar-container">
          <Link to="/Pedidos">
            <button
              className="btn btn-primary button buttonNuevoPedido"
              onClick={update}
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

export default EditarPedido;
