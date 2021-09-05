import { configureStore } from "@reduxjs/toolkit";
import { categoriesReducer } from "./CategoriesReducer";
import { currencyReducer } from "./currencyReducer";
import { loadingReducer } from "./LoadingReducer";
import { productReducer } from "./ProductReducers";
import { cardReducer } from "./CartReducer";

import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    persistCombineReducers,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'fed',
    blacklist: ['categories', 'loading', 'currency', 'cartReducer'],
    version: 1,
    storage,
}
const persistedReducer = persistCombineReducers(persistConfig, {
    currency: currencyReducer,
    categories: categoriesReducer,
    loading: loadingReducer,
    products: productReducer,
    cartReducer: cardReducer
})
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

let persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store
export { persistor, persistConfig }


