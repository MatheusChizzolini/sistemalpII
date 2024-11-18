import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ESTADO from "./estados";
import { consultarProduto } from "../servicos/servicoProduto";

const buscarProdutos = createAsyncThunk('buscarProdutos', async () => {
    const resultado = await consultarProduto();

    try {
        if (Array.isArray(resultado)) {
            return {
                "status": true,
                "mensagem": "Produtos recuperados com sucesso.",
                listaDeProdutos
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
            state.mensagem = "Processando requisição (buscando produtos)"
        })
        .addCase(buscarProdutos.fulfilled, (state, action) => {
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
    }
})

export default produtoReducer.reducer;
