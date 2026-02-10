'use server'

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function addToCart(productId: string) {
     const x = (await cookies()).get('next-auth.session-token')?.value;
    const accessToken = await decode({ token: x, secret: process.env.NEXTAUTH_SECRET! });
   
   //console.log(accessToken?.token);
  //  console.log("decoded:", accessToken);
    //  console.log("actualToken:", actualToken);



    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
        method: 'POST',
        body: JSON.stringify({ productId }),
        headers: {
            token: process.env.TOKEN,
            "content-type": "application/json"
        } 
    });
    const data = await response.json();
 
    return data;
}