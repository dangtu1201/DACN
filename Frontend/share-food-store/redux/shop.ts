import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ShopModel {
    _id: string;
    shopName: string;
    address: string;
    status: string;
}

const initialState: ShopModel = {
    _id: '',
    shopName: '',
    address: '',
    status: '',
};

const shop = createSlice({
    name: "shop",
    initialState,
    reducers: {
        setShop: (state, action: PayloadAction<ShopModel>) => {
            state._id = action.payload._id;
            state.shopName = action.payload.shopName;
            state.address = action.payload.address;
            state.status = action.payload.status;
        }
    }
});

export const { setShop } = shop.actions;
export default shop.reducer;