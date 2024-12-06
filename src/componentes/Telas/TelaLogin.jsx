import { Container, Form, Button } from "react-bootstrap";
import { useContext, useRef } from "react";
import { ContextoUsuario } from "../../App";
import { login } from "../../servicos/servicoUsuario";

export default function TelaLogin() {
    const nomeUsuario = useRef();
    const senha = useRef();
    const { usuario, setUsuario } = useContext(ContextoUsuario);

    function manipularSubmissao(evento) {
        const userInput = nomeUsuario.current.value;
        const passwordInput = senha.current.value;
        login(userInput, passwordInput)
            .then((resposta) => {
                if (resposta.status) {
                    setUsuario({
                        "usuario": userInput,
                        "logado": true,
                        "privilegio": resposta.privilegio
                    });
                }
                else {
                    window.alert(resposta.mensagem);
                }
            });
        evento.preventDefault();
        evento.stopPropagation();
    }


    return (
        <Container className="w-25 border p-2">
            <Form onSubmit={manipularSubmissao}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Usuário</Form.Label>
                    <Form.Control
                        type="text"
                        id="usuario"
                        name="usuario"
                        placeholder="Informe o usuário"
                        ref={nomeUsuario}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        id="senha"
                        name="senha"
                        placeholder="Digite a sua senha"
                        ref={senha}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </Container>
    );
}