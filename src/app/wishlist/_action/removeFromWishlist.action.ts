'use server'

import DecodeToken from "@/app/_components/Token/Token";
export async function removeFromWishlist(productId: string) {
  const accessToken = await DecodeToken();  
   
  
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
            token:accessToken?.token!,
        },
        // next:{revalidate:60}
        cache: "no-store",
      }
    );
  
    return res.json();
  }