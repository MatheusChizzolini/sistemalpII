import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ESTADO from "./estados";
import { consultarProduto, excluirProduto as excluir, gravarProduto, alterarProduto } from "../servicos/servicoProduto";

export const buscarProdutos = createAsyncThunk('buscarProdutos', async () => {
    const resultado = await consultarProduto();

    try {
        if (Array.isArray(resultado)) {
            return {
                "status": true,
                "mensagem": "Produtos recuperados com sucesso.",
                "listaDeProdutos": resultado
            }
        }
        else {
            return {
                "status": false,
                "mensagem": "Erro ao recuperar produtos do backend.",
                "listaDeProdutos": []
            }
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message,
            "listaDeProdutos": []
        }
    }
});

export const excluirProduto = createAsyncThunk('excluirProduto', async (produto) => {
    const resultado = await excluir(produto);

    try {
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "codigo": produto.codigo
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message,
        }
    }
});

export const incluirProduto = createAsyncThunk('incluirProduto', async (produto) => {
    try {
        const resultado = await gravarProduto(produto);
        if (resultado.status) {
            produto.codigo = resultado.codigo;
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                "produto": produto
            }
        }
        else {
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
            }
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message
        }
    }
});

export const atualizarProduto = createAsyncThunk('atualizarProduto', async (produto) => {
    try {
        const resultado = await alterarProduto(produto);
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "produto": produto
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message
        }
    }
});

const produtoReducer = createSlice({
    name: 'produto',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaDeProdutos: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(buscarProdutos.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE
            state.mensagem = "Processando requisição"
        })
            .addCase(buscarProdutos.fulfilled, (state, action) => { // BUSCAR
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaDeProdutos = action.payload.listaDeProdutos;
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                    state.listaDeProdutos = action.payload.listaDeProdutos;
                }
            })
            .addCase(buscarProdutos.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                state.listaDeProdutos = action.payload.listaDeProdutos;
            })
            .addCase(excluirProduto.pending, (state, action) => { // EXCLUIR
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição";
            })
            .addCase(excluirProduto.fulfilled, (state, action) => {
                state.mensagem = action.payload.mensagem;
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.listaDeProdutos = state.listaDeProdutos.filter((item) => item.codigo !== action.payload.codigo);
                } else
                    state.estado = ESTADO.ERRO;
            })
            .addCase(excluirProduto.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = ""
            })
            .addCase(incluirProduto.pending, (state, action) => { // INCLUIR
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição";
            })
            .addCase(incluirProduto.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaDeProdutos.push(action.payload.produto);
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(incluirProduto.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            .addCase(atualizarProduto.pending, (state, action) => { // ATUALIZAR
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição";
            })
            .addCase(atualizarProduto.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaDeProdutos = state.listaDeProdutos.map((item) => item.codigo === action.payload.produto.codigo ? action.payload.produto : item);
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarProduto.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
    }
})

export default produtoReducer.reducer;
