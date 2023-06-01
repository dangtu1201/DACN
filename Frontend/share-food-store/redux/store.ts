import { combineReducers, configureStore } from "@reduxjs/toolkit"

import login from "./login";

const rootReducer = combineReducers({
    login: login,
});

export const store = configureStore({
    reducer: rootReducer,
});


export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
