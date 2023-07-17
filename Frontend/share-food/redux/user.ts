import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface UserModel {
    email: string;
    phone: string;
    name: string;
}

const initialState: UserModel = {
    email: '',
    phone: '',
    name: '',
};

const userInfo = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<UserModel>) => {
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.name = action.payload.name;
        }
    }
});

export const { setUserInfo } = userInfo.actions;
export default userInfo.reducer;
