import { Alert } from "react-bootstrap";
import FormCadCliente from "./Formularios/FormCadCliente";
import Pagina from "../layouts/Pagina";
import { useState } from "react";
import TabelaClientes from "./Tabelas/TabelaClientes";
import { clientes } from "../../dados/mockClientes";

export default function TelaCadastroCliente(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaClientes, setListaClientes] = useState(clientes);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState({
        codigo: 0,
        nome: "",
        cpf: "",
        endereco: "",
        dataNasc: ""    
    });

    return (
        <div>
            <Pagina>
                <Alert className="mt-2 mb-2 text-center" variant="success">
                    <h2>Cadastro de Cliente</h2>
                </Alert>
                {
                    exibirTabela ? (
                        <TabelaClientes
                            listaClientes={listaClientes}
                            setListaClientes={setListaClientes}
                            setExibirTabela={setExibirTabela}
                            setModoEdicao={setModoEdicao}
                            setClienteSelecionado={setClienteSelecionado}
                        />
                    ) : (
                        <FormCadCliente
                            listaClientes={listaClientes}
                            setListaClientes={setListaClientes}
                            setExibirTabela={setExibirTabela}
                            clienteSelecionado={clienteSelecionado}
                            setClienteSelecionado={setClienteSelecionado}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}
                        />
                    )
                }
            </Pagina>
        </div>
    );
}
