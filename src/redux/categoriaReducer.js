import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ESTADO from "./estados";
import { alterarCategoria, consultarCategoria, excluirCategoria as excluir, gravarCategoria } from "../servicos/servicoCategoria";

export const incluirCategoria = createAsyncThunk('incluirCategoria', async (categoria) => {
    try {
        const resultado = await gravarCategoria(categoria);
        if (resultado.status) {
            categoria.codigo = resultado.codigo;
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                "categoria": categoria
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

export const buscarCategoria = createAsyncThunk('buscarCategoria', async () => {
    const resultado = await consultarCategoria();

    try {
        if (Array.isArray(resultado)) {
            return {
                "status": true,
                "mensagem": "Categorias recuperados com sucesso.",
                "listaCategorias": resultado
            }
        }
        else {
            return {
                "status": false,
                "mensagem": "Erro ao recuperar categorias do backend.",
                "listaCategorias": []
            }
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message,
            "listaCategorias": []
        }
    }
});

export const atualizarCategoria = createAsyncThunk('atualizarCategoria', async (categoria) => {
    try {
        const resultado = await alterarCategoria(categoria);
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "categoria": categoria
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message
        }
    }
});

export const excluirCategoria = createAsyncThunk('excluirCategoria', async (categoria) => {
    const resultado = await excluir(categoria);

    try {
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "codigo": categoria.codigo
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message,
        }
    }
});

const categoriaReducer = createSlice({
    name: 'categoria',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaCategorias: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(incluirCategoria.pending, (state, action) => { // INCLUIR
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Processando a requisição";
        })
            .addCase(incluirCategoria.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaCategorias.push(action.payload.categoria);
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(incluirCategoria.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            .addCase(buscarCategoria.pending, (state, action) => { // BUSCAR
                state.estado = ESTADO.PENDENTE
                state.mensagem = "Processando requisição"
            })
            .addCase(buscarCategoria.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaCategorias = action.payload.listaCategorias;
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                    state.listaCategorias = action.payload.listaCategorias;
                }
            })
            .addCase(buscarCategoria.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                state.listaCategorias = action.payload.listaCategorias;
            })
            .addCase(atualizarCategoria.pending, (state, action) => { // ATUALIZAR
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição";
            })
            .addCase(atualizarCategoria.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaCategorias = state.listaCategorias.map((item) => item.codigo === action.payload.categoria.codigo ? action.payload.categoria : item);
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarCategoria.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            .addCase(excluirCategoria.pending, (state, action) => { // EXCLUIR
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição";
            })
            .addCase(excluirCategoria.fulfilled, (state, action) => {
                state.mensagem = action.payload.mensagem;
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.listaCategorias = state.listaCategorias.filter((item) => item.codigo !== action.payload.codigo);
                } else
                    state.estado = ESTADO.ERRO;
            })
            .addCase(excluirCategoria.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = ""
            })
    }
})

export default categoriaReducer.reducer;