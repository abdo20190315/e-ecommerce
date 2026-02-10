export interface WishlistProduct {
    _id: string;
    title: string;
    imageCover: string;
    price: number;
    ratingsAverage: number;
  }
  
  export interface WishlistResponse {
    status: string;
    count: number;
    data: WishlistProduct[];
  }
  