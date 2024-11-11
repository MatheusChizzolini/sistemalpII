import Pagina from "./componentes/layouts/Pagina";
import TelaCadastroProduto from "./componentes/Telas/TelaCadastroProduto";
import TelaCadastroCategoria from "./componentes/Telas/TelaCadastroCategoria";
import TelaCadastroFornecedor from "./componentes/Telas/TelaCadastroFornecedor";
import TelaCadastroEntregador from "./componentes/Telas/TelaCadastroEntregador";
import TelaMenu from "./componentes/Telas/TelaMenu";
import Tela404 from "./componentes/Telas/Tela404";
import TelaCadastroCliente from "./componentes/Telas/TelaCadastroCliente";
import TelaCadastroUsuario from "./componentes/Telas/TelaCadastroUsuario";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";
import TelaLogin from "./componentes/Telas/TelaLogin";

export const ContextoUsuario = createContext();
function App() {
  const [usuario, setUsuario] = useState({
    "usuario": "",
    "logado": false
  });

  if (usuario.logado) {
    return (
      <ContextoUsuario.Provider value={{ usuario, setUsuario }}>
        <TelaLogin />
      </ContextoUsuario.Provider>
    );
  }
  else {
    return (
      <div className="App">
        <ContextoUsuario.Provider value={{ usuario, setUsuario }}>
          <BrowserRouter>
            { //A ordem das rotas é importante 
            }
            <Routes>
              <Route path="/produto" element={<TelaCadastroProduto />} />
              <Route path="/cliente" element={<TelaCadastroCliente />} />
              <Route path="/categoria" element={<TelaCadastroCategoria />} />
              <Route path="/fornecedor" element={<TelaCadastroFornecedor />} />
              <Route path="/entregador" element={<TelaCadastroEntregador />} />
              <Route path="/usuario" element={<TelaCadastroUsuario />} />
              <Route path="/" element={<TelaMenu />} />
              <Route path="*" element={<Tela404 />} />
            </Routes>
          </BrowserRouter>
        </ContextoUsuario.Provider>
      </div>
    );
  }
}

export default App;
