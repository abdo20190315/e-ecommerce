'use server'

import DecodeToken from "@/app/_components/Token/Token";
export async function addToWishlist(productId: string) {
  const accessToken = await DecodeToken();  

  // Prevent sending an undefined token header to the API
  if (!accessToken?.token) {
    throw new Error("User not logged in");
  }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/wishlist`,
      {
        method: "POST",
        headers: {
          token: accessToken.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
        // next:{revalidate:60}
        cache: "no-store",
        
      }
      
    );
  
    return res.json();
  }