import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storeUser, clearUser } from "../services/testLogin";
import { store } from "./store";

export interface LoginModel {
    statusLogin: 'login' | 'logout';
    userId: string;
    userToken: string;
    shopId?: string;
}

export interface IUser {
    userId: string;
    userToken: string;
}

const initialState: LoginModel = {
    statusLogin: 'logout',
    userId: '',
    userToken: '',
    shopId: '64894d02fd080955888326c4',
};

const login = createSlice({
    name: "login",
    initialState,
    reducers: {
        loginApp: (state, action: PayloadAction<{userId: string, usertoKen: string}>) => {
            const user = {
                userId: action.payload.userId,
                userToken: action.payload.usertoKen,
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
        },
        setUser: (state, action: PayloadAction<IUser>) => {
            state.userId = action.payload.userId;
            state.userToken = action.payload.userToken;
        }
    }
});

export const { loginApp, logoutApp, setStatusLogin, setUser } = login.actions;
export default login.reducer;
