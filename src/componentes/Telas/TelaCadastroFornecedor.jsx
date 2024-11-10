import { useState } from "react";
import { fornecedores } from "../../dados/mockFornecedores";
import Pagina from "../layouts/Pagina";
import { Alert } from "react-bootstrap";
import TabelaFornecedor from "./Tabelas/TabelaFornecedor";
import FormCadFornecedor from "./Formularios/FormCadFornecedor";

export default function TelaCadastroFornecedor(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaFornecedores, setListaFornecedores] = useState(fornecedores);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [fornecedorSel, setFornecedorSel] = useState({
        id: 0,
        nome: "",
        cnpj: "",
        cep: "",
        telefone: "",
        email: ""
    });

    return (
        <div>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Fornecedor
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaFornecedor listaFornecedores = {listaFornecedores}
                        setListaFornecedores = {setListaFornecedores}
                        setExibirTabela = {setExibirTabela}
                        setModoEdicao = {setModoEdicao}
                        setFornecedorSel = {setFornecedorSel}/> : 
                        <FormCadFornecedor listaFornecedores = {listaFornecedores}
                        setListaFornecedores = {setListaFornecedores}
                        setExibirTabela = {setExibirTabela}
                        fornecedorSel = {fornecedorSel}
                        setFornecedorSel = {setFornecedorSel}
                        modoEdicao = {modoEdicao}
                        setModoEdicao = {setModoEdicao}/>
                }
            </Pagina>
        </div>
    );
}