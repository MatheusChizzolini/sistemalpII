import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

export default function FormCadEntregador(props) {
    const [entregador, setEntregador] = useState(props.entregadorSel);
    const [formValidado, setFormValidado] = useState(false);

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                props.setListaEntregador([...props.listaEntregador, entregador]);
                props.setExibirTabela(true);
            }
            else {
                props.setListaEntregador(props.listaEntregador.map((item) => {
                    if (item.id !== entregador.id) {
                        return item
                    }
                    else {
                        return entregador
                    }
                }));

                props.setModoEdicao(false);
                props.setEntregadorSel({
                    id: 0,
                    nome: "",
                    cnh: "",
                    veiculo: "",
                    placa: ""
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
        setEntregador({...entregador, [elemento]:valor});
    }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="id"
                        name="id"
                        value={entregador.id}
                        disabled={props.modoEdicao}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o ID do entregador!</Form.Control.Feedback>
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
                        value={entregador.nome}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o nome do entregador!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
            <Form.Group as={Col} md="4">
                    <Form.Label>CNH</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="cnh"
                        name="cnh"
                        value={entregador.cnh}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe a CNH do entregador!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>Veiculo</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="veiculo"
                        name="veiculo"
                        value={entregador.veiculo}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o veículo do entregador!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>Placa</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="placa"
                        name="placa"
                        value={entregador.placa}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o telefone do fornecedor!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className='mt-2 mb-2'>
                <Col md = {1}>
                    <Button type="submit">{props.modoEdicao ? "Alterar":"Confirmar"}</Button>
                </Col>
                <Col md={{offset:1}}>
                    <Button onClick={()=>{
                        props.setExibirTabela(true);
                    }}>Voltar</Button>
                </Col>
            </Row>
        </Form>
    );
}
