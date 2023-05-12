import "./App.css";
import "./Componentes-CSS/Header.css";
import "./Componentes-CSS/Footer.css";
import "./Componentes-CSS/CardPedidos.css";
import "./Componentes-CSS/Categorias.css";
import "./Componentes-CSS/Input.css";
import "./Componentes-CSS/Productos.css";
import "./Componentes-CSS/Login.css";




import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Componentes-Registro/Login";


import Pedidos from "./Componentes-Pedidos/Pedidos";
import NuevoPedido from "./Componentes-Pedidos/NuevoPedido";
import EditarPedido from "./Componentes-Pedidos/EditarPedido";

import Productos from "./Componentes-Productos/Productos";
import CrearProducto from "./Componentes-Productos/CrearProducto";
import EditarProducto from "./Componentes-Productos/EditarProducto";

import Historial from "./Componentes-Historial/Historial";


import Categorias from "./Componentes-Categorias/Categorias";
import NuevaCategoria from "./Componentes-Categorias/NuevaCategoria";






function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          
          <Route path="/Pedidos" element={<Pedidos />}/>
          <Route path="/NuevoPedido" element={<NuevoPedido />} />
          <Route path="/EditarPedido/:id" element={<EditarPedido />}/>
          
          <Route path="/Productos/:categorias" element={<Productos />}/>
          <Route path="/CrearProducto/:categorias" element={<CrearProducto />}/>
          <Route path="/EditarProducto/:id" element={<EditarProducto />}/>

          <Route path="/Historial" element={<Historial />}/>
          
          <Route path="/Categorias" element={<Categorias />}/>
          <Route path="/NuevaCategoria" element={<NuevaCategoria />}/>
          
          
          
          
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
