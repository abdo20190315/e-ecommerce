export interface OrderItem {
    _id: string;
    count: number;
    price: number;
    product: {
        _id: string;
        title: string;
        imageCover: string;
        brand?: { name: string };
        category?: { name: string };
    };
}

export interface Order {
    _id: string;
    totalOrderPrice: number;
    paymentMethodType: string;
    isPaid?: boolean;
    isDelivered?: boolean;
    shippingAddress?: {
        details: string;
        phone: string;
        city: string;
    };
    cartItems: OrderItem[];
    createdAt?: string;
}