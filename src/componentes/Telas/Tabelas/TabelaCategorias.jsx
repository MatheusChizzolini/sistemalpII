import { Container, Button, Table } from "react-bootstrap";
import { consultarCategoria } from "../../../servicos/servicoCategoria";
import { useEffect, useState } from "react";

export default function TabelaCategoria(props) {
    const [listaCategoria, setListaCategoria] = useState([]);
    function editarCategoria(categoria) {
        props.setModoEdicao(true);
        props.setCategoriaSel(categoria);
        props.setExibirTabela(false);
    }

    function excluirCategoria(categoria) {
        if (window.confirm("Deseja excluir a categoria " + categoria.descricao)) {
            props.setListaCategoria(props.listaCategoria.filter((item) => {
                return item.codigo !== categoria.codigo
            }));
        }
    }

    useEffect(() => {
        consultarCategoria().then((res) => {
            if (Array.isArray(res))
                setListaCategoria(res);
            else
                window.alert(res.mensagem);
        });
    }, []);

    return (
        <div>
            <Container>
                <Button className="mb=3" variant="primary"
                    onClick={() => {
                        props.setExibirTabela(false);
                    }}>
                    Adicionar
                </Button>
                <Table striped bordered hover>
                    <thead>
                        <th>Código</th>
                        <th>Descrição</th>
                    </thead>
                    <tbody>
                        {
                            listaCategoria?.map((categoria) => {
                                return (
                                    <tr>
                                        <td>{categoria.codigo}</td>
                                        <td>{categoria.descricao}</td>
                                        <td>
                                            <Button onClick={() => {
                                                editarCategoria(categoria);
                                            }} variant="warning">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                </svg>
                                            </Button>

                                            <Button onClick={() => {
                                                excluirCategoria(categoria);
                                            }} variant="danger">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                </svg>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                <p>Quantidade de categorias cadastradas: {listaCategoria.length}</p>
            </Container>
        </div>
    );
}