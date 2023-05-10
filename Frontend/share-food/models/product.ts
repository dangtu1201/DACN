export interface ProductModel {
    id: string;
    name: string;
    description: string;
    priceNoDiscount: number;
    priceDiscount: number;
    image: string;
    category: string;
    quantity: number;
    shopOwner: string;
    status: string;
    created_at: Date;
    updated_at: Date;
}