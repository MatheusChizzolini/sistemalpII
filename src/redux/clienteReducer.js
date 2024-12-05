import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ESTADO from "./estados";
import { consultarCliente, excluirCliente as excluir, gravarCliente, alterarCliente } from "../servicos/servicoCliente";

export const buscarClientes = createAsyncThunk('buscarClientes', async () => {
    const resultado = await consultarCliente();

    try {
        if (Array.isArray(resultado)) {
            return {
                "status": true,
                "mensagem": "Clientes recuperados com sucesso.",
                "listaClientes": resultado
            }
        }
        else {
            return {
                "status": false,
                "mensagem": "Erro ao recuperar cliente do backend",
                "listaClientes": []
            }
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro" + erro.message,
        }
    }
});

export const excluirCliente = createAsyncThunk('excluirCliente', async (cliente) => {
    const resultado = await excluirCliente(cliente);
    try {
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "codigo": cliente.codigo
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro:" + erro.message
        }
    }
});

export const incluirCliente = createAsyncThunk('incluirCliente', async (cliente) => {
    try {
        const resultado = await gravarCliente(cliente);
        if (resultado.status) {
            cliente.codigo = resultado.codigo;
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                "cliente": cliente
            }
        }
        else {
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem
            }
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro:" + erro.message
        }
    }
});

export const atualizarCliente = createAsyncThunk('atualizarCliente', async (cliente) => {
    try {
        const resultado = await alterarCliente(cliente);
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "cliente": cliente
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro" + erro.message
        }
    }
});

const clienteReducer = createSlice({
    name: 'cliente',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaClientes: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(buscarClientes.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE
            state.mensagem = "Processando requisição"
        })
            .addCase(buscarClientes.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaClientes = action.payload.listaClientes;
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                    state.listaClientes = action.payload.listaClientes;
                }
            })
            .addCase(buscarClientes.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                state.listaClientes = action.payload.listaClientes;
            })
        builder
            .addCase(excluirCliente.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição";
            })
            .addCase(excluirCliente.fulfilled, (state, action) => {
                state.mensagem = action.payload.mensagem;
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.listaClientes = state.listaClientes.filter((item) => item.codigo !== action.payload.codigo);
                } else {
                    state.estado = ESTADO.ERRO;
                }
            })
            .addCase(excluirCliente.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload?.mensagem || "Erro ao excluir cliente.";
            })
        .addCase(incluirCliente.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição";
            })
        .addCase(incluirCliente.fulfilled, (state, action) => {
            if (action.payload.status) {
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                state.listaClientes.push(action.payload.cliente);
            }
            else {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            }
        })
        .addCase(incluirCliente.rejected, (state, action) => {
            state.estado = ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
        })
        .addCase(atualizarCliente.pending, (state, action) => {
            if (action.payload.status) {
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                state.listaClientes = state.listaClientes.map((item) => item.codigo === action.payload.cliente.codigo ? action.payload.cliente : item);
            }
            else {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            }
        })
        .addCase(atualizarCliente.rejected, (state, action) => {
            state.estado = ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
        })
}
})

export default clienteReducer.reducer;