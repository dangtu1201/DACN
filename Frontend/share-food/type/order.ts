export interface OrderModal {
    _id: string;
    shop: {
        shopName: string;
        address: string;
    };
    createAt: string;
    status: string;
    total: number;
}