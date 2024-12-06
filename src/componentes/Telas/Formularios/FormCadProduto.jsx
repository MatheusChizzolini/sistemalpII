import { Alert, Button, Spinner, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { incluirProduto, atualizarProduto } from '../../../redux/produtoReducer';
import ESTADO from '../../../redux/estados'
import { buscarFornecedor } from '../../../redux/fornecedorReducer';
import { buscarCategoria } from '../../../redux/categoriaReducer';

export default function FormCadProdutos(props) {
    const [produto, setProduto] = useState(props.produtoSelecionado);
    const [formValidado, setFormValidado] = useState(false);
    const { estado, mensagem, listaDeProdutos } = useSelector((state) => state.produto);
    const { listaCategorias } = useSelector((state) => state.categoria);
    const { listaFornecedores } = useSelector((state) => state.fornecedor);
    const [mensagemExibida, setMensagemExibida] = useState("");
    const despachante = useDispatch();

    useEffect(() => {
        despachante(buscarCategoria());
        despachante(buscarFornecedor());
    }, []);

    function selecionarCategoria(evento) {
        setProduto({
            ...produto,
            categoria: {
                codigo: evento.currentTarget.value
            }
        });
    }

    function selecionarFornecedor(evento) {
        setProduto({
            ...produto,
            fornecedor: {
                id: evento.currentTarget.value
            }
        });
    }

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                despachante(incluirProduto(produto));
                setMensagemExibida(mensagem);
                setMensagemExibida("");
                setProduto({
                    codigo: 0,
                    descricao: "",
                    precoCusto: 0,
                    precoVenda: 0,
                    qtdEstoque: 0,
                    urlImagem: "",
                    dataValidade: "",
                    categoria: {},
                    fornecedor: {}
                });
                props.setExibirTabela(true);
            }
            else {
                despachante(atualizarProduto(produto));
                setMensagemExibida(mensagem);
                props.setModoEdicao(false);
                props.setProdutoSelecionado({
                    codigo: 0,
                    descricao: "",
                    precoCusto: 0,
                    precoVenda: 0,
                    qtdEstoque: 0,
                    urlImagem: "",
                    dataValidade: "",
                    categoria: {},
                    fornecedor: {}
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

        if (elemento === 'categoria') {
            setProduto({
                ...produto,
                [elemento]: {
                    codigo: valor,
                }
            });
        }
        else {
            setProduto({ ...produto, [elemento]: valor });
        }
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
                            <Form.Control
                                required
                                type="text"
                                id="codigo"
                                name="codigo"
                                value={produto.codigo}
                                disabled={props.modoEdicao}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type='invalid'>Por favor, informe o código do produto!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="12">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="descricao"
                                name="descricao"
                                value={produto.descricao}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, informe a descrição do produto!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="4">
                            <Form.Label>Preço de Custo:</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="precoCusto">R$</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    id="precoCusto"
                                    name="precoCusto"
                                    aria-describedby="precoCusto"
                                    value={produto.precoCusto}
                                    onChange={manipularMudanca}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o preço de custo!
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Preço de Venda:</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="precoVenda">R$</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    id="precoVenda"
                                    name="precoVenda"
                                    aria-describedby="precoVenda"
                                    value={produto.precoVenda}
                                    onChange={manipularMudanca}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o preço de venda!
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Qtd em estoque:</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="qtdEstoque">+</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    id="qtdEstoque"
                                    name="qtdEstoque"
                                    aria-describedby="qtdEstoque"
                                    value={produto.qtdEstoque}
                                    onChange={manipularMudanca}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe a quantidade em estoque!
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="12">
                            <Form.Label>Url da imagem:</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="urlImagem"
                                name="urlImagem"
                                value={produto.urlImagem}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, informe a url da imagem do produto!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="4">
                            <Form.Label>Válido até:</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="dataValidade"
                                name="dataValidade"
                                value={produto.dataValidade}
                                disabled={props.modoEdicao}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, informe a data de validade do produto!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={3}>
                            <Form.Label>Categoria:</Form.Label>
                            <Form.Select id='categoria'
                                name='categoria'
                                value={produto.categoria.codigo}
                                onChange={selecionarCategoria}>
                                <option value="">
                                    Selecionar
                                </option>
                                {
                                    listaCategorias.map((categoria) => {
                                        return <option value={categoria.codigo}>
                                            {categoria.descricao}
                                        </option>
                                    })
                                }

                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md={4}>
                            <Form.Label>Fornecedor:</Form.Label>
                            <Form.Select id='fornecedor'
                                name='fornecedor'
                                value={produto.fornecedor.id}
                                onChange={selecionarFornecedor}>
                                <option value="">
                                    Selecionar
                                </option>
                                {
                                    listaFornecedores.map((fornecedor) => {
                                        return <option value={fornecedor.id}>
                                            {fornecedor.nome}
                                        </option>
                                    })
                                }

                            </Form.Select>
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
                                props.setProdutoSelecionado({
                                    codigo: 0,
                                    descricao: "",
                                    precoCusto: 0,
                                    precoVenda: 0,
                                    qtdEstoque: 0,
                                    urlImagem: "",
                                    dataValidade: "",
                                    categoria: {},
                                    fornecedor: {}
                                });
                            }}>Voltar</Button>
                        </Col>
                    </Row>
                    <Toaster position="top-right" />
                </Form>
                {
                    mensagemExibida ? <Alert variant="sucess">{mensagem}</Alert> : ""
                }
            </div>
        );
    }
}