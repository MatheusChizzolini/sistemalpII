import { useState } from "react";
import { Button, Alert, Spinner } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import ESTADO from "../../../redux/estados";
import { useDispatch, useSelector } from "react-redux";
import { atualizarUsuario, incluirUsuario } from "../../../redux/usuarioReducer";

export default function FormCadUsuario(props) {
    const [usuario, setUsuario] = useState(props.usuarioSelecionado);
    const [formValidado, setFormValidado] = useState(false);
    const { estado, mensagem, listaUsuarios } = useSelector((state) => state.fornecedor);
    const [mensagemExibida, setMensagemExibida] = useState("");
    const despachante = useDispatch();

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                despachante(incluirUsuario(usuario));
                setMensagemExibida(mensagem);
                setMensagemExibida("");
                setUsuario({
                    nome: "",
                    email: "",
                    senha: "",
                    senhaConfirmada: "",
                    privilegio: ""
                });
                props.setExibirTabela(true);
            }
            else {
                despachante(atualizarUsuario(usuario));
                setMensagemExibida(mensagem);
                props.setModoEdicao(false);
                props.setUsuarioSelecionado({
                    nome: "",
                    email: "",
                    senha: "",
                    senhaConfirmada: "",
                    privilegio: ""
                });
                props.setExibirTabela(true);
            }
        }
        else {
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setUsuario({ ...usuario, [elemento]: valor });
    }

    if (estado === ESTADO.PENDENTE) {
        return (
            <div>
                <Spinner animation="border" role="status"></Spinner>
                <Alert variant="primary">{mensagem}</Alert>
            </div>
        );
    } else if (estado === ESTADO.ERRO) {
        return (
            <div>
                <Alert variant="danger">{mensagem}</Alert>
                <Button onClick={() => {
                    props.setExibirTabela(true);
                }}>Voltar</Button>
            </div>
        );
    } else if (estado === ESTADO.OCIOSO) {
        return (
            <div>
                {
                    mensagemExibida ? <Alert variant="sucess">{mensagem}</Alert> : ""
                }
            </div>
        );
    }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Código</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            required
                            type="text"
                            id="codigo"
                            name="codigo"
                            value={usuario.codigo}
                            disabled={props.modoEdicao}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type='invalid'>
                            Código inválido.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>

            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="nome"
                        name="nome"
                        value={usuario.nome}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe o nome completo.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>RG</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            id="rg"
                            name="rg"
                            aria-describedby="rg"
                            value={usuario.rg}
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o RG!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group as={Col} md="4">
                    <Form.Label>Função</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            id="funcao"
                            name="funcao"
                            aria-describedby="funcao"
                            value={usuario.funcao}
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe a sua função!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group as={Col} md="4">
                    <Form.Label>Senha</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="password"
                            id="senha"
                            name="senha"
                            aria-describedby="senha"
                            value={usuario.senha}
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe a sua senha!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>

            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    <Button type="submit">{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
                </Col>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => {
                        props.setExibirTabela(true);
                        props.setModoEdicao(false);
                        props.setUsuarioSelecionado({
                            nome: "",
                            email: "",
                            senha: "",
                            senhaConfirmada: "",
                            privilegio: ""
                        });
                    }}>
                        Voltar
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}