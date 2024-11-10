import { useState } from "react";
import { Alert } from "react-bootstrap";
import Pagina from "../layouts/Pagina";
import {usuarios} from "../../dados/mockUsuario";
import FormCadUsuario from "./Formularios/FormCadUsuario";
import TabelaUsuarios from "./Tabelas/TabelaUsuarios"
export default function TelaCadastroUsuario(props){
    const [exibirTabela, setExibirTabela] = useState(true);
    const[listaUsuarios, setListaUsuarios] = useState(usuarios);
    const[modoEdicao, setModoEdicao] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({
        "codigo":0,
        "nome":"",
        "rg":"",
        "funcao":"",
        "senha":""
    });
    return (
        <div>
            <Pagina>
                <Alert className="mt-2 mb-2 text-center" variant="success">
                    <h2>Cadastro de Usuário</h2>
                </Alert>
                {
                    exibirTabela ? (
                        <TabelaUsuarios
                            listaUsuarios={listaUsuarios}
                            setListaUsuarios={setListaUsuarios}
                            setExibirTabela={setExibirTabela}
                            setModoEdicao={setModoEdicao}
                            setUsuarioSelecionado={setUsuarioSelecionado}
                        />
                    ) : (
                        <FormCadUsuario
                            listaUsuarios={listaUsuarios}
                            setListaUsuarios={setListaUsuarios}
                            setExibirTabela={setExibirTabela}
                            usuarioSelecionado={usuarioSelecionado}
                            setUsuarioSelecionado={setUsuarioSelecionado}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}
                        />
                    )
                }
            </Pagina>
        </div>
    );
}