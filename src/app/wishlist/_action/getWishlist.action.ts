'use server'

import DecodeToken from "@/app/_components/Token/Token";
export async function getWishlist() {
  const accessToken = await DecodeToken();  
   
  
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        method: "GET",
        headers: {
          token :accessToken?.token!,
        },
        // next:{revalidate:60}
        cache: "no-store",
      }
    );
  
    return res.json();
  }