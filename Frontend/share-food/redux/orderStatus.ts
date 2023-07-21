import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StatusModel {
    status: string;
}

const initialState: StatusModel = {
    status: '',
};

const orderStatus = createSlice({
    name: "orderStatus",
    initialState,
    reducers: {
        setOrderStatus: (state, action: PayloadAction<StatusModel>) => {
            state.status = action.payload.status;
        }
    }
});

export const { setOrderStatus } = orderStatus.actions;
export default orderStatus.reducer;