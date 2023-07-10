export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: string;
    phoneNumber: string;
    userToken: string;
    location: {
        lat: number;
        lng: number;
        address: string;
    }
}