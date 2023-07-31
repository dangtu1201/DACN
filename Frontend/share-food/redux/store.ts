import { combineReducers, configureStore } from "@reduxjs/toolkit"

import userAddrReducer from "./userAddr";
import login from "./login";
import userInfo from "./user";
import cart from "./cart";
import ordersProcessing from "./ordersProcessing";
import ordersHistory from "./ordersHistory";
import orderStatus from "./orderStatus";
import { authApi } from "./api/authApi";
import { productApi } from "./api/productApi";
import { shopApi } from "./api/shopApi";
import { orderApi } from "./api/orderApi";
import { imageApi } from "./api/imageApi";

const rootReducer = combineReducers({
    userAddr: userAddrReducer,
    login: login,
    user: userInfo,
    cart: cart,
    ordersProcessing: ordersProcessing,
    ordersHistory: ordersHistory,
    orderStatus: orderStatus,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [imageApi.reducerPath]: imageApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
    }).concat(authApi.middleware, productApi.middleware, shopApi.middleware
        , orderApi.middleware, imageApi.middleware),
});


export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
