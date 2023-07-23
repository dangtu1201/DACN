import { combineReducers, configureStore } from "@reduxjs/toolkit"

import userAddrReducer from "./userAddr";
import login from "./login";
import shop from "./shop";
import userInfo from "./user";
import status from "./status";
import ordersHistory from "./ordersHistory";
import ordersProcessing from "./ordersProcessing";
import orderStatus from "./orderStatus";
import { authApi } from "./api/authApi";
import { productApi } from "./api/productApi";
import { orderApi } from "./api/orderApi";
import { imageApi } from "./api/imageApi";

const rootReducer = combineReducers({
    userAddr: userAddrReducer,
    login: login,
    shop: shop,
    userInfo: userInfo,
    status: status,
    ordersHistory: ordersHistory,
    ordersProcessing: ordersProcessing,
    orderStatus: orderStatus,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [imageApi.reducerPath]: imageApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, productApi.middleware, orderApi.middleware, imageApi.middleware),
});


export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
