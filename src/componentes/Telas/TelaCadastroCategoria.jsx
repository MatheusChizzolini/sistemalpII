import { Alert } from "react-bootstrap";
import FormCadCategorias from "./Formularios/FormCadCategoria";
import Pagina from "../layouts/Pagina";
import { useState } from "react";
import TabelaCategoria from "./Tabelas/TabelaCategorias";
//import { categoria } from "../../dados/mockCategoria"
 
export default function TelaCadastroCategoria(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [categoriaSel, setCategoriaSel] = useState({
        codigo: 0,
        descricao: ""
    });

    return (
        <div>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>Cadastro de Categoria</h2>
                </Alert>
                {
                    exibirTabela ?
                    <TabelaCategoria
                        setExibirTabela={setExibirTabela}
                        setModoEdicao={setModoEdicao}
                        setCategoriaSel={setCategoriaSel}
                    /> : 
                    <FormCadCategorias
                        setExibirTabela={setExibirTabela}
                        setModoEdicao={setModoEdicao}
                        setCategoriaSel={setCategoriaSel}
                        categoriaSel={categoriaSel}
                        modoEdicao={modoEdicao}
                    />
                }
            </Pagina>
        </div>
    );
}