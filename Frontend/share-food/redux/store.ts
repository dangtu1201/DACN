import { combineReducers, configureStore } from "@reduxjs/toolkit"

import userAddrReducer from "./userAddr";
import login from "./login";
import user from "./user";
import cart from "./cart";
import { authApi } from "./api/authApi";
import { productApi } from "./api/productApi";
import { shopApi } from "./api/shopApi";

const rootReducer = combineReducers({
    userAddr: userAddrReducer,
    login: login,
    user: user,
    cart: cart,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [shopApi.reducerPath]: shopApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, productApi.middleware, shopApi.middleware),
});


export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
