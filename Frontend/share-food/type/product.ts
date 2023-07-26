export interface IProduct {
    _id: string;
    price_old: number;
    name: string;
    description: string;
    quantity: number;
    price: number;
    activeTime: {
        from: string;
        to: string;
    };
    status: string;
    image: string;
    rating: number;
    shop: {
        coordinates: {
            lat: number;
            long: number;
        };
        _id: string;
        shopName: string;
        address: string;
        status: string;
    };
}

export interface IProductDetail {
    _id: string;
    price_old: number;
    name: string;
    description: string;
    quantity: number;
    price: number;
    activeTime: {
        from: string;
        to: string;
    };
    status: string;
    shop: {
        coordinates: {
            lat: number;
            long: number;
        };
        _id: string;
        shopName: string;
        address: string;
        status: string;
    };
    images: string;
}