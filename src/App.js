

import "./App.css";
import "./Componentes-CSS/Navbar.css";
import "./Componentes-CSS/Botones.css";
import "./Componentes-CSS/Productos.css";
import "./Componentes-CSS/NuevoPedido.css";
import "./Componentes-CSS/CardPedido.css";
import "./Componentes-CSS/TituloComponentes.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Componentes-Registro/Login";
import NewResto from "./Componentes-Registro/NewResto";

import Pedidos from "./Componentes-Pedidos/Pedidos";
import NuevoPedido from "./Componentes-Pedidos/NuevoPedido";
import EditarPedido from "./Componentes-Pedidos/EditarPedido";

import Productos from "./Componentes-Productos/Productos";
import CrearProducto from "./Componentes-Productos/CrearProducto";
import EditarProducto from "./Componentes-Productos/EditarProducto";

import Historial from "./Componentes-Historial/Historial";

import Inventario from "./Componentes-Inventario/Inventario";
import Proveedores from "./Componentes-Proveedores/Proveedores";
import NuevoProveedor from "./Componentes-Proveedores/NuevoProveedor";
import InventarioActual from "./Componentes-Inventario/InventarioActual";
import ActualizarInventario from "./Componentes-Inventario/ActualizarInventario";




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/NewResto" element={<NewResto />}/>
          <Route path="/Inventario" element={<Inventario />}/>
          
          <Route path="/Pedidos" element={<Pedidos />}/>
          <Route path="/NuevoPedido" element={<NuevoPedido />} />
          <Route path="/EditarPedido/:id" element={<EditarPedido />}/>
          
          <Route path="/Productos" element={<Productos />}/>
          <Route path="/CrearProducto" element={<CrearProducto />}/>
          <Route path="/EditarProducto/:id" element={<EditarProducto />}/>

          <Route path="/Historial" element={<Historial />}/>
          
          <Route path="/Inventario/Proveedores" element={<Proveedores />}/>
          <Route path="/NuevoProveedor" element={<NuevoProveedor />}/>
          <Route path="/Inventario/InventarioActual" element={<InventarioActual />}/>
          <Route path="/Inventario/ActualizarInventario" element={<ActualizarInventario />}/>
          
          
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
