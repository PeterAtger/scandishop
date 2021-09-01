import { configureStore } from "@reduxjs/toolkit";
import { categoriesReducer } from "./CategoriesReducer";
import { currencyReducer } from "./currencyReducer";
import { loadingReducer } from "./LoadingReducer";
import { productReducer } from "./ProductReducers";

const store = configureStore({
    reducer:
    {
        currency: currencyReducer,
        categories: categoriesReducer,
        loading: loadingReducer,
        products: productReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store


