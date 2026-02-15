'use server'

import DecodeToken from "@/app/_components/Token/Token";

export async function addToCart(productId: string) {

    const accessToken = await DecodeToken();  


//test
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/cart`, {
        method: 'POST',
        body: JSON.stringify({ productId }),
        headers: {
            token :accessToken?.token!,
            "Content-Type": "application/json"
        } 
    });
    const data = await response.json();
 
    return data;
}