import { combineReducers, configureStore } from "@reduxjs/toolkit"

import userAddrReducer from "./userAddr";
import login from "./login";
import shop from "./shop";
import userInfo from "./user";
import status from "./status";
import { authApi } from "./api/authApi";
import { productApi } from "./api/productApi";

const rootReducer = combineReducers({
    userAddr: userAddrReducer,
    login: login,
    shop: shop,
    userInfo: userInfo,
    status: status,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, productApi.middleware),
});


export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
