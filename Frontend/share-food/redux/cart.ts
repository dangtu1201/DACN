import { CartModel } from "../models/cart";
import { ProductModel } from "../models/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "../services/toast";

interface AddProductToCartPayload {
    product: ProductModel | undefined;
    quantity: number;
}

const initialState: CartModel = {
    id: "",
    product: [],
    total: 0,
    paymentMethod: "CASH",
    userId: "",
    shopId: "",
    shopName: "",
    shopAddress: "",
    shopCoordinates: {
        lat: 0,
        long: 0,
    },
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProductToCart(state, action: PayloadAction<AddProductToCartPayload>) {
            const { product, quantity } = action.payload;
            // check if product in same shop
            if (state.shopId !== "" && state.shopId !== product?.shop._id) {
                toast("error", "Lỗi", "Bạn không thể thêm sản phẩm từ cửa hàng khác");
                return;
            }
            // check if product is active
            if (product?.status !== "Active") {
                toast("error", "Lỗi", "Sản phẩm đã hết hàng");
                return;
            }
            // check if product is available
            if (product.quantity < quantity) {
                toast("error", "Lỗi", "Số lượng sản phẩm không đủ");
                return;
            }
            // check shop status
            if (product.shop.status == "Inactive") {
                toast("error", "Lỗi", "Cửa hàng đã đóng cửa");
                return;
            } else if (product.shop.status == "Unapproved") {
                toast("error", "Lỗi", "Cửa hàng chưa được duyệt");
                return;
            }
            const index = state.product.findIndex((item) => item.product._id === product._id);
            if (index !== -1) {
                state.product[index].quantity += quantity;
            } else {
                state.product.push({ product, quantity });
            }
            state.total += product.price * quantity;
            if (state.shopId === "") {
                state.shopId = product.shop._id;
                state.shopName = product.shop.shopName;
                state.shopAddress = product.shop.address;
                state.shopCoordinates = product.shop.coordinates;
            }
        },
        updateQuantity(state, action: PayloadAction<{ productId: string; quantity: number }>) {
            const { productId, quantity } = action.payload;
            const index = state.product.findIndex((item) => item.product._id === productId);
            if (index !== -1) {
                state.product[index].quantity = quantity;
                state.total = state.product.reduce((total, item) => total + item.product.price * item.quantity, 0);
            }
        },
        addQuantityOne(state, action: PayloadAction<{ productId: string }>) {
            const { productId } = action.payload;
            const index = state.product.findIndex((item) => item.product._id === productId);
            if (index !== -1) {
                state.product[index].quantity += 1;
                state.total = state.product.reduce((total, item) => total + item.product.price * item.quantity, 0);
            }
        },
        minmusQuantityOne(state, action: PayloadAction<{ productId: string }>) {
            const { productId } = action.payload;
            const index = state.product.findIndex((item) => item.product._id === productId);
            if (index !== -1) {
                // check if quantity is 1
                if (state.product[index].quantity === 1) {
                    // delete product
                    state.product.splice(index, 1);
                    // update total
                    state.total = state.product.reduce((total, item) => total + item.product.price * item.quantity, 0);
                    // check if cart is empty
                    if (state.product.length === 0) {
                        state.shopId = "";
                        state.shopName = "";
                        state.shopAddress = "";
                        state.shopCoordinates = {
                            lat: 0,
                            long: 0,
                        };
                        state.paymentMethod = "CASH";
                    }
                    return;
                }
                state.product[index].quantity -= 1;
                state.total = state.product.reduce((total, item) => total + item.product.price * item.quantity, 0);
            }
        },
        removeProduct(state, action: PayloadAction<{ productId: string }>) {
            const { productId } = action.payload;
            const index = state.product.findIndex((item) => item.product._id === productId);
            if (index !== -1) {
                state.product.splice(index, 1);
                state.total = state.product.reduce((total, item) => total + item.product.price * item.quantity, 0);
            }
            // check if cart is empty
            if (state.product.length === 0) {
                state.shopId = "";
                state.shopName = "";
                state.shopAddress = "";
                state.shopCoordinates = {
                    lat: 0,
                    long: 0,
                };
                state.paymentMethod = "CASH";
            }
        },
        clearCart(state) {
            state.product = [];
            state.total = 0;
            state.shopId = "";
            state.shopName = "";
            state.shopAddress = "";
            state.shopCoordinates = {
                lat: 0,
                long: 0,
            };
            state.paymentMethod = "CASH";
        },
        updatePaymentMethod(state, action: PayloadAction<{ paymentMethod: "CASH" | "MOMO" }>) {
            const { paymentMethod } = action.payload;
            state.paymentMethod = paymentMethod;
        }
    }
});

const { reducer, actions } = cartSlice;
export const { addProductToCart, updateQuantity, addQuantityOne, minmusQuantityOne, removeProduct, clearCart, updatePaymentMethod } = actions;
export default reducer;
