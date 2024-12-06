import { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import ESTADO from "../../../redux/estados";
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Spinner } from "react-bootstrap";
import { incluirCliente, atualizarCliente} from "../../../redux/clienteReducer"
export default function FormCadCliente(props) {
    const [cliente, setCliente] = useState(props.clienteSelecionado);
    const [formValidado, setFormValidado] = useState(false);
    const { estado, mensagem, listaClientes } = useSelector((state) => state.cliente);
    const [mensagemExibida, setMensagemExibida] = useState("");
    const despachante = useDispatch();

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                despachante(incluirCliente(cliente));
                setMensagemExibida(mensagem);
                setMensagemExibida("");
                setCliente({
                    codigo: 0,
                    nome: "",
                    cpf: "",
                    endereco: "",
                    dataNascimento: ""
                });
                props.setExibirTabela(true);
            }
            else {
                despachante(atualizarCliente(cliente));
                setMensagemExibida(mensagem);
                props.setModoEdicao(false);
                props.setClienteSelecionado({
                    codigo: 0,
                    nome:"",
                    cpf:"",
                    endereco:"",
                    dataNascimento: ""
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
        setCliente({ ...cliente, [elemento]: valor });
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
                            <Form.Label>Código</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    required
                                    type="text"
                                    id="codigo"
                                    name="codigo"
                                    value={cliente.codigo}
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
                                value={cliente.nome}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, informe o nome completo.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-4">
                        <Form.Group as={Col} md="4">
                            <Form.Label>CPF</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    id="cpf"
                                    name="cpf"
                                    aria-describedby="cpf"
                                    value={cliente.cpf}
                                    onChange={manipularMudanca}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o cpf!
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col} md="4">
                            <Form.Label>Endereço</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    id="endereco"
                                    name="endereco"
                                    aria-describedby="endereco"
                                    value={cliente.endereco}
                                    onChange={manipularMudanca}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o endereço!
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col} md="4">
                            <Form.Label>Data de nascimento</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    id="dataNascimento"
                                    name="dataNascimento"
                                    aria-describedby="dataNascimento"
                                    value={cliente.dataNascimento}
                                    onChange={manipularMudanca}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe a data de nascimento!
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
                                props.setClienteSelecionado({
                                    codigo: 0,
                                    nome:"",
                                    cpf:"",
                                    endereco:"",
                                    dataNascimento: ""
                                });
                            }}>
                                Voltar
                            </Button>
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
