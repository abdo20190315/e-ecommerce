'use server'

import DecodeToken from "@/app/_components/Token/Token";
import { WishlistResponse } from "@/types/wishlist";

export async function getWishlist(): Promise<WishlistResponse | null> {
  const accessToken = await DecodeToken();  
   
  if (!accessToken?.token) {
    return null;
  }
  
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist`,
    {
      method: "GET",
      headers: {
        token: accessToken.token,
      },
      cache: "no-store",
    }
  );
  
  if (!res.ok) {
    return null;
  }
  
  return res.json();
}