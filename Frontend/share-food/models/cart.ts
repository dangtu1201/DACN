import { ProductModel } from './product';
export interface CartModel {
    id: string;
    product: {
        product: ProductModel;
        quantity: number;
    }[];
    total: number;
    paymentMethod: "CASH" | "MOMO";
    userId: string;
    shopId: string;
    shopName: string;
    shopAddress: string;
    shopCoordinates: {
        lat: number;
        long: number;
    };
}
