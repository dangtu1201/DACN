import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StatusModel {
    status: string;
}

const initialState: StatusModel = {
    status: '',
};

const status = createSlice({
    name: "status",
    initialState,
    reducers: {
        setStatus: (state, action: PayloadAction<StatusModel>) => {
            state.status = action.payload.status;
        }
    }
});

export const { setStatus } = status.actions;
export default status.reducer;