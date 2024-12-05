import { configureStore } from "@reduxjs/toolkit";
import produtoReducer from "./produtoReducer";
import clienteReducer from "./clienteReducer";
import fornecedorReducer from "./fornecedorReducer";
import categoriaReducer from "./categoriaReducer";

const store = configureStore({
    reducer: {
        'produto': produtoReducer,
        'cliente': clienteReducer
        'fornecedor': fornecedorReducer,
        'categoria': categoriaReducer
    }
});

export default store;