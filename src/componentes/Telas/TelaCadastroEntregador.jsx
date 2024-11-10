import { useState } from "react";
import Pagina from "../layouts/Pagina"
import { entregador } from "../../dados/mockEntregador";
import TabelaEntregador from "./Tabelas/TabelaEntregador";
import FormCadEntregador from "./Formularios/FormCadEntregador";
import { Alert } from "react-bootstrap";

export default function TelaCadastroEntregador(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaEntregador, setListaEntregador] = useState(entregador);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [entregadorSel, setEntregadorSel] = useState({
        id: 0,
        nome: "",
        cnh: "",
        veiculo: "",
        placa: ""
    });

    return (
        <div>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                <h2>Cadastro de Entregadores</h2>
                </Alert>
                {
                    exibirTabela ?
                    <TabelaEntregador
                    listaEntregador={listaEntregador}
                    setListaEntregador={setListaEntregador}
                    setExibirTabela={setExibirTabela}
                    setModoEdicao={setModoEdicao}
                    setEntregadorSel={setEntregadorSel}
                    /> : 
                    <FormCadEntregador
                    listaEntregador={listaEntregador}
                    setListaEntregador={setListaEntregador}
                    setExibirTabela={setExibirTabela}
                    setModoEdicao={setModoEdicao}
                    setEntregadorSel={setEntregadorSel}
                    entregadorSel={entregadorSel}
                    modoEdicao={modoEdicao}
                    />
                }
            </Pagina>
        </div>
    );
}
