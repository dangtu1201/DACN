export interface IShop {
    _id: string;
    shopName: string;
    rating: number;
    coordinates: {
        lat: number;
        long: number;
    };
    shopOwner: {
        image: string;
    };
}