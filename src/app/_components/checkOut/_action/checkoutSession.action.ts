'use server'
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function checkoutSessionAction(cartId: string, shippingAddress: {details?: string, city?: string, phone?: string}) {
    // Get session token from cookies
    const x = (await cookies()).get('next-auth.session-token')?.value;
    if (!x) throw new Error("User not logged in");

    const accessToken = await decode({ token: x, secret: process.env.NEXTAUTH_SECRET! });

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXT_PUBLIC_NEXT_URL}/allorders`, {
        method: "POST",
        body: JSON.stringify({ shippingAddress }),
        headers: {
            token: accessToken?.token!,
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    return data;
}
