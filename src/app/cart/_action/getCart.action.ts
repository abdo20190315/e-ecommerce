'use server'
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { CartResponse } from "@/types";

export async function getCartAction(): Promise<CartResponse | null> {
    const x = (await cookies()).get('next-auth.session-token')?.value;
    if (!x) return null;

    const accessToken = await decode({ token: x, secret: process.env.NEXTAUTH_SECRET! });
    
    if (!accessToken?.token) {
        return null;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v2/cart`, {
        headers: {
            token: accessToken.token,
        },
    });

    // Check if response is successful
    if (!response.ok) {
        // Return null instead of throwing to prevent 500 errors
        return null;
    }

    // Check content-type before parsing JSON
    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
        console.error("Expected JSON but got:", contentType);
        return null;
    }

    const data: CartResponse = await response.json();
    return data;
}
