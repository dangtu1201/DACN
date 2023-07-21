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