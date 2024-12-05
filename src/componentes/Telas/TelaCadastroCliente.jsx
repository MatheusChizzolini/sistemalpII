import { Alert } from "react-bootstrap";
import FormCadCliente from "./Formularios/FormCadCliente";
import Pagina from "../layouts/Pagina";
import { useState } from "react";
import TabelaClientes from "./Tabelas/TabelaClientes";

export default function TelaCadastroCliente(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState({
        codigo: 0,
        nome: "",
        cpf: "",
        endereco: "",
        dataNascimento: ""    
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
                            setExibirTabela={setExibirTabela}
                            setModoEdicao={setModoEdicao}
                            setClienteSelecionado={setClienteSelecionado}
                        />
                    ) : (
                        <FormCadCliente
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
