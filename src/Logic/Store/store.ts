import { configureStore } from "@reduxjs/toolkit";
import { currencyReducer } from "./rootReducer";

const store = configureStore({ reducer: currencyReducer })

export default store


