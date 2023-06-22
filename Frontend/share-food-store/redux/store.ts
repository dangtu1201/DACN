import { combineReducers, configureStore } from "@reduxjs/toolkit"

import login from "./login";
import userAddr from "./userAddr";

const rootReducer = combineReducers({
    login: login,
    userAddr: userAddr,
});

export const store = configureStore({
    reducer: rootReducer,
});


export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
