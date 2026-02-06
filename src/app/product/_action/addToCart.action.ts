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
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODJhMmFhYmFiODkzZmViMzY1NDQ2MiIsIm5hbWUiOiJBYmRlbHJhaG1hbiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzcwMzAzMDU3LCJleHAiOjE3NzgwNzkwNTd9.zeH3KYRGFLWbK5iRJzPr4Bg_y7D8tfmWn58WF9Un7NA",
            "content-type": "application/json"
        } 
    });
    const data = await response.json();
 
    return data;
}