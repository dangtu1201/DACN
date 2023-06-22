import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserAddrModel {
    lat: number;
    lng: number;
    address: string;
}

const initialState: UserAddrModel = {
    lat: 10.772029,
    lng: 106.657817,
    address: "268 Lý Thường Kiệt, Phường 14, Quận 10, Thành phố Hồ Chí Minh, Vietnam",
};

const userAddr = createSlice({
    name: "userAddr",
    initialState,
    reducers: {
        setUserAddr: (state, action: PayloadAction<UserAddrModel>) => {
            state.lat = action.payload.lat;
            state.lng = action.payload.lng;
            state.address = action.payload.address;
        },
        setAddress: (state, action: PayloadAction<string>) => {
            state.address = action.payload;
        },
        setLocation: (state, action: PayloadAction<{ lat: number, lng: number }>) => {
            state.lat = action.payload.lat;
            state.lng = action.payload.lng;
        }
    }
});

export const { setUserAddr, setAddress, setLocation } = userAddr.actions;
export default userAddr.reducer;

