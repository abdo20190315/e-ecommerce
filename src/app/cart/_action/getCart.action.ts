'use server'
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { CartResponse } from "@/types";

export async function getCartAction(): Promise<CartResponse> {
    // جلب التوكن من cookie
    const x = (await cookies()).get('next-auth.session-token')?.value;
    if (!x) throw new Error("User not logged in");

    const accessToken = await decode({ token: x, secret: process.env.NEXTAUTH_SECRET! });

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
            token: accessToken?.token!,
        },
    });

    const data: CartResponse = await response.json();
    return data;
}
