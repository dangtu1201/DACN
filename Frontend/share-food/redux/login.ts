import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storeUser, clearUser } from "../services/testLogin";
import { store } from "./store";

export interface LoginModel {
    statusLogin: 'login' | 'logout';
}

export interface IUser {
    userId: string;
    userToken: string;
}

const initialState: LoginModel = {
    statusLogin: 'logout',
};

const login = createSlice({
    name: "login",
    initialState,
    reducers: {
        loginApp: (state, action: PayloadAction<{phoneNumber: string, password: string}>) => {
            const user = {
                userId: action.payload.phoneNumber,
                userToken: action.payload.password,
            }
            storeUser(user);
            state.statusLogin = 'login';
        },
        logoutApp: (state) => {
            clearUser();
            state.statusLogin = 'logout';
        },
        setStatusLogin: (state, action: PayloadAction<'login' | 'logout'>) => {
            state.statusLogin = action.payload;
        }
    }
});

export const { loginApp, logoutApp, setStatusLogin } = login.actions;
export default login.reducer;
