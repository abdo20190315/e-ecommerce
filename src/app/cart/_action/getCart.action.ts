'use server'
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { CartResponse } from "@/types";

export async function getCartAction(): Promise<CartResponse | null> {
    const cookieStore = await cookies();

    // Support both dev and production cookie names so decoding works on Vercel too
    const rawToken =
        cookieStore.get('next-auth.session-token')?.value ??
        cookieStore.get('__Secure-next-auth.session-token')?.value;

    if (!rawToken) return null;

    const secret = process.env.NEXTAUTH_SECRET;
    // Safe fallback: if secret is missing, fail gracefully instead of throwing
    if (!secret) return null;

    const accessToken = await decode({ token: rawToken, secret });

    if (!accessToken || !accessToken.token) {
        return null;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/cart`, {
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
