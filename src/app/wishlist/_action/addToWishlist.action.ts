'use server'

import DecodeToken from "@/app/_components/Token/Token";
export async function addToWishlist(productId: string) {
  const accessToken = await DecodeToken();  
  
  
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        method: "POST",
        headers: {
          token:accessToken?.token!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
        // next:{revalidate:60}
        cache: "no-store",
        
      }
      
    );
  
    return res.json();
  }