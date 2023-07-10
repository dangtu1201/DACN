export interface IProduct { 
    _id: string;
    name: string;
    quantity: number;
    price: number;
    activeTime: {
        from: string;
        to: string;
    };
    status: string;
    price_old: number;
    image: string;
    description: string;
    discount_id: [string];
    shop: string;
    category: [string];
}
