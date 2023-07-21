export interface OrderModal {
    _id: string;
    user: {
        name: string;
        phone: string;
    };
    createAt: string;
    status: string;
    total: number;
}

export interface IProductItem {
    product: {
        _id: string,
        name: string,
        price: number,
        price_old: number,
        image: string,
        activeTime: {
            from: string,
            to: string,
        }
    },
    quantity: number,
}