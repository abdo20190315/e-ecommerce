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
  export interface WishlistCategory {
    _id: string;
    name: string;
    slug: string;
    image: string;
  }
  
  export interface WishlistBrand {
    _id: string;
    name: string;
    slug: string;
    image: string;
  }
  