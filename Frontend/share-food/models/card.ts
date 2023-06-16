import { ProductModel } from './product';
export interface CardModel {
    id: string;
    product: {
        product: ProductModel[];
        quantity: number;
    };
    totalPayment: number;
    paymentMethod: "CASH" | "MOMO";
    userId: string;
    createAt: Date;
    updateAt: Date;
}
