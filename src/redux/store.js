import { configureStore } from "@reduxjs/toolkit";
import produtoReducer from "./produtoReducer";
import fornecedorReducer from "./fornecedorReducer";

const store = configureStore({
    reducer: {
        'produto': produtoReducer,
        'fornecedor': fornecedorReducer
    }
});

export default store;