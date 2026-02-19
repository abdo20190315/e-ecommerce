'use server'
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function checkoutSessionAction(cartId: string, shippingAddress: {details?: string, city?: string, phone?: string}) {
    // Get session token from cookies (support both dev and production names)
    const cookieStore = await cookies();
    const rawToken =
        cookieStore.get('next-auth.session-token')?.value ??
        cookieStore.get('__Secure-next-auth.session-token')?.value;

    if (!rawToken) throw new Error("User not logged in");

    const secret = process.env.NEXTAUTH_SECRET;
    // Safe fallback: if secret is missing or token can't be decoded, treat as not logged in
    if (!secret) throw new Error("User not logged in");

    const accessToken = await decode({ token: rawToken, secret });

    if (!accessToken || !accessToken.token) throw new Error("User not logged in");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXT_PUBLIC_NEXT_URL}`, {
        method: "POST",
        body: JSON.stringify({ shippingAddress }),
        headers: {
            // Ensure we only ever send a real token to the API
            token: accessToken.token,
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    return data;
}
