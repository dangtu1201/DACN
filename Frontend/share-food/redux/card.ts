import { CardModel } from "../models/card";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: CardModel = {
    id: "",
    product: {
        product: [],
        quantity: 0,
    },
    totalPayment: 0,
    paymentMethod: "CASH",
    userId: "",
    createAt: new Date(),
    updateAt: new Date(),
};
