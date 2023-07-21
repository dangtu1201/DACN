import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StatusModel {
    status: number;
}

const initialState: StatusModel = {
    status: 0,
};

const orderStatus = createSlice({
    name: "orderStatus",
    initialState,
    reducers: {
        setOrderStatus: (state, action: PayloadAction<StatusModel>) => {
            state.status = action.payload.status;
        },
        addOrderStatus: (state) => {
            state.status = state.status + 1;
        }
    }
});

export const { setOrderStatus, addOrderStatus } = orderStatus.actions;
export default orderStatus.reducer;