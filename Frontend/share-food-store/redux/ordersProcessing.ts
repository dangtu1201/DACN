import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderModal } from "../type/order";

const initialState: { data: OrderModal[] } = {
    data: [],
};

const ordersProcessing = createSlice({
    name: "ordersProcessing",
    initialState,
    reducers: {
        setOrdersProcessing: (state, action: PayloadAction<OrderModal[]>) => {
            state.data = action.payload;
        }
    }
});

export const { setOrdersProcessing } = ordersProcessing.actions;
export default ordersProcessing.reducer;