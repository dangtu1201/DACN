import { combineReducers, configureStore } from "@reduxjs/toolkit"

import userAddrReducer from "./userAddr";

const rootReducer = combineReducers({
    userAddr: userAddrReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});


export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
