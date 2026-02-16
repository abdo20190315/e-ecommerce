'use server'

import DecodeToken from "@/app/_components/Token/Token";

export async function addToCart(productId: string) {

    const accessToken = await DecodeToken();  

    // Guard against missing/invalid token so we don't hit the API with an undefined token
    if (!accessToken?.token) {
        throw new Error("User not logged in");
    }


//test
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v2/cart`, {
        method: 'POST',
        body: JSON.stringify({ productId }),
        headers: {
            token: accessToken.token,
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
 
    return data;
}