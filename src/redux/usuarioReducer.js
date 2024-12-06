import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ESTADO from "./estados";
import { alterarUsuario, consultarUsuario, gravarUsuario, excluirUsuario as excluir } from "../servicos/servicoUsuario";

export const incluirUsuario = createAsyncThunk('incluirUsuario', async (usuario) => {
    try {
        const resultado = await gravarUsuario(usuario);
        if (resultado.status) {
            usuario.nome = resultado.nome;
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                "usuario": usuario
            }
        } else {
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
            }
        }
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message
        }
    }
});

export const buscarUsuario = createAsyncThunk('buscarUsuario', async () => {
    try {
        const resultado = await consultarUsuario();
        if (Array.isArray(resultado)) {
            return {
                "status": true,
                "mensagem": "Usuarios recuperados com sucesso",
                "listaUsuarios": resultado
            }
        }
        else {
            return {
                "status": false,
                "mensagem": "Erro ao recuperar os usuarios do backend.",
                "listaUsuarios": []
            }
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message,
            "listaUsuarios": []
        }
    }
});

export const atualizarUsuario = createAsyncThunk('atualizarUsuario', async (usuario) => {
    try {
        const resultado = await alterarUsuario(usuario);
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "usuario": usuario
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message
        }
    }
});

export const excluirUsuario = createAsyncThunk('excluirUsuario', async (usuario) => {
    const resultado = await excluir(usuario);

    try {
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "nome": usuario.nome
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message,
        }
    }
});

const usuarioReducer = createSlice({
    name: 'usuario',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaUsuarios: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(incluirUsuario.pending, (state, action) => { // INCLUIR
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Processando a requisição";
        })
            .addCase(incluirUsuario.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaUsuarios.push(action.payload.usuario);
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(incluirUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            .addCase(buscarUsuario.pending, (state) => { // BUSCAR
                state.estado = ESTADO.PENDENTE
                state.mensagem = "Processando requisição"
            })
            .addCase(buscarUsuario.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaUsuarios = action.payload.listaUsuarios;
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                    state.listaUsuarios = action.payload.listaUsuarios;
                }
            })
            .addCase(buscarUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                state.listaUsuarios = action.payload.listaUsuarios;
            })
            .addCase(atualizarUsuario.pending, (state, action) => { // ATUALIZAR
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição";
            })
            .addCase(atualizarUsuario.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaUsuarios = state.listaUsuarios.map((item) => item.nome === action.payload.usuario.nome ? action.payload.usuario : item);
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            .addCase(excluirUsuario.pending, (state, action) => { // EXCLUIR
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição";
            })
            .addCase(excluirUsuario.fulfilled, (state, action) => {
                state.mensagem = action.payload.mensagem;
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.listaUsuarios = state.listaUsuarios.filter((item) => item.nome !== action.payload.nome);
                } else
                    state.estado = ESTADO.ERRO;
            })
            .addCase(excluirUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = ""
            })
    }
})

export default usuarioReducer.reducer;