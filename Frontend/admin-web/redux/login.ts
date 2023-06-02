import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storeUserId, clearUserId } from "../services/testLogin";
import { store } from "./store";

export interface LoginModel {
    statusLogin: 'login' | 'logout';
}

const initialState: LoginModel = {
    statusLogin: 'logout',
};

const login = createSlice({
    name: "login",
    initialState,
    reducers: {
        loginApp: (state, action: PayloadAction<string>) => {
            storeUserId(action.payload);
            state.statusLogin = 'login';
        },
        logoutApp: (state) => {
            clearUserId();
            state.statusLogin = 'logout';
        },
        setStatusLogin: (state, action: PayloadAction<'login' | 'logout'>) => {
            state.statusLogin = action.payload;
        }
    }
});

export const { loginApp, logoutApp, setStatusLogin } = login.actions;
export default login.reducer;
