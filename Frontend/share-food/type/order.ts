export interface OrderModal {
    _id: string;
    shop: {
        shopName: string;
        address: string;
    };
    createAt: string;
    status: string;
    isReviewed: boolean;
    total: number;
}

export interface IProductItem {
    product: {
        _id: string,
        name: string,
        price: number,
        price_old: number,
        image: string,
        rating: number,
        activeTime: {
            from: string,
            to: string,
        }
    },
    quantity: number,
}
