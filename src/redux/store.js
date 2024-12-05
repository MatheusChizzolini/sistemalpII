import { configureStore } from "@reduxjs/toolkit";
import produtoReducer from "./produtoReducer";
import clienteReducer from "./clienteReducer";

const store = configureStore({
    reducer: {
        'produto': produtoReducer,
        'cliente': clienteReducer
    }
});

export default store;