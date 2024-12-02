import { alterarFornecedor, consultarFornecedor, gravarFornecedor, excluirFornecedor as excluir } from "../servicos/servicoFornecedor";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ESTADO from "./estados";

export const incluirFornecedor = createAsyncThunk('incluirFornecedor', async (fornecedor) => {
    try {
        const resultado = await gravarFornecedor(fornecedor);
        if (resultado.status) {
            fornecedor.id = resultado.id;
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                "fornecedor": fornecedor
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

export const buscarFornecedor = createAsyncThunk('buscarFornecedor', async () => {
    const resultado = await consultarFornecedor();

    try {
        if (Array.isArray(resultado)) {
            return {
                "status": true,
                "mensagem": "Fornecedores recuperados com sucesso.",
                "listaFornecedores": resultado
            }
        }
        else {
            return {
                "status": false,
                "mensagem": "Erro ao recuperar fornecedores do backend.",
                "listaFornecedores": []
            }
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message,
            "listaFornecedores": []
        }
    }
});

export const atualizarFornecedor = createAsyncThunk('atualizarFornecedor', async (fornecedor) => {
    try {
        const resultado = await alterarFornecedor(fornecedor);
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "fornecedor": fornecedor
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message
        }
    }
});

export const excluirFornecedor = createAsyncThunk('excluirFornecedor', async (fornecedor) => {
    const resultado = await excluir(fornecedor);

    try {
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "id": fornecedor.id
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message,
        }
    }
});

const fornecedorReducer = createSlice({
    name: 'fornecedor',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaFornecedores: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(incluirFornecedor.pending, (state, action) => { // INCLUIR
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Processando a requisição";
        })
            .addCase(incluirFornecedor.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaFornecedores.push(action.payload.fornecedor);
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(incluirFornecedor.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            .addCase(buscarFornecedor.pending, (state, action) => { // BUSCAR
                state.estado = ESTADO.PENDENTE
                state.mensagem = "Processando requisição"
            })
            .addCase(buscarFornecedor.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaFornecedores = action.payload.listaFornecedores;
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                    state.listaFornecedores = action.payload.listaFornecedores;
                }
            })
            .addCase(buscarFornecedor.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                state.listaFornecedores = action.payload.listaFornecedores;
            })
            .addCase(atualizarFornecedor.pending, (state, action) => { // ATUALIZAR
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição";
            })
            .addCase(atualizarFornecedor.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaFornecedores = state.listaFornecedores.map((item) => item.id === action.payload.fornecedor.id ? action.payload.fornecedor : item);
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarFornecedor.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            .addCase(excluirFornecedor.pending, (state, action) => { // EXCLUIR
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição";
            })
            .addCase(excluirFornecedor.fulfilled, (state, action) => {
                state.mensagem = action.payload.mensagem;
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.listaFornecedores = state.listaFornecedores.filter((item) => item.id !== action.payload.id);
                } else
                    state.estado = ESTADO.ERRO;
            })
            .addCase(excluirFornecedor.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = ""
            })
    }
})

export default fornecedorReducer.reducer;