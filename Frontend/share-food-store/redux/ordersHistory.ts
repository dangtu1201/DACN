import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderModal } from "../type/order";

const initialState: { data: OrderModal[] } = {
    data: [],
};

const ordersHistory = createSlice({
    name: "ordersHistory",
    initialState,
    reducers: {
        setOrdersHistory: (state, action: PayloadAction<OrderModal[]>) => {
            state.data = action.payload;
        }
    }
});

export const { setOrdersHistory } = ordersHistory.actions;
export default ordersHistory.reducer;
