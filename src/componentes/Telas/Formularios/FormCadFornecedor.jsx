import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Alert, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { incluirFornecedor, atualizarFornecedor } from '../../../redux/fornecedorReducer';
import ESTADO from '../../../redux/estados';
import { useSelector, useDispatch } from 'react-redux';

export default function FormCadFornecedor(props) {
    const [fornecedor, setFornecedor] = useState(props.fornecedorSel);
    const [formValidado, setFormValidado] = useState(false);
    const { estado, mensagem, listaFornecedores } = useSelector((state) => state.fornecedor);
    const [mensagemExibida, setMensagemExibida] = useState("");
    const despachante = useDispatch();

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                despachante(incluirFornecedor(fornecedor));
                setMensagemExibida(mensagem);
                setMensagemExibida("");
                setFornecedor({
                    id: 0,
                    nome: "",
                    cnpj: "",
                    cep: "",
                    telefone: "",
                    email: ""
                });
                props.setExibirTabela(true);
            }
            else {
                despachante(atualizarFornecedor(fornecedor));
                setMensagemExibida(mensagem);
                props.setModoEdicao(false);
                props.setFornecedorSel({
                    id: 0,
                    nome: "",
                    cnpj: "",
                    cep: "",
                    telefone: "",
                    email: ""
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
        setFornecedor({ ...fornecedor, [elemento]: valor });
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
                <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="4">
                            <Form.Label>ID</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="id"
                                name="id"
                                value={fornecedor.id}
                                disabled={props.modoEdicao}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type='invalid'>Por favor, informe o ID do fornecedor!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="4">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="nome"
                                name="nome"
                                value={fornecedor.nome}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type='invalid'>Por favor, informe o nome do fornecedor!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="4">
                            <Form.Label>CNPJ</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="cnpj"
                                name="cnpj"
                                value={fornecedor.cnpj}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type='invalid'>Por favor, informe o CNPJ do fornecedor!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>CEP</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="cep"
                                name="cep"
                                value={fornecedor.cep}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type='invalid'>Por favor, informe o CEP do fornecedor!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="telefone"
                                name="telefone"
                                value={fornecedor.telefone}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type='invalid'>Por favor, informe o telefone do fornecedor!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="4">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="email"
                                name="email"
                                value={fornecedor.email}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type='invalid'>Por favor, informe o email do fornecedor!</Form.Control.Feedback>
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
                                props.setFornecedorSel({
                                    id: 0,
                                    nome: "",
                                    cnpj: "",
                                    cep: "",
                                    telefone: "",
                                    email: ""
                                });
                            }}>Voltar</Button>
                        </Col>
                    </Row>
                </Form>
                {
                    mensagemExibida ? <Alert variant="sucess">{mensagem}</Alert> : ""
                }
            </div>
        );
    }
}