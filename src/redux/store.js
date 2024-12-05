import { configureStore } from "@reduxjs/toolkit";
import produtoReducer from "./produtoReducer";
import fornecedorReducer from "./fornecedorReducer";
import categoriaReducer from "./categoriaReducer";

const store = configureStore({
    reducer: {
        'produto': produtoReducer,
        'fornecedor': fornecedorReducer,
        'categoria': categoriaReducer
    }
});

export default store;