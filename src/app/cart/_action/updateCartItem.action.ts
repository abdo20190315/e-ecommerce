'use server'

import DecodeToken from "@/app/_components/Token/Token";

export async function updateCartItemAction(productId: string, count: number) {
  const accessToken = await DecodeToken();
  if (!accessToken?.token) throw new Error("User not logged in");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v2/cart/${productId}`, {
    method: 'PUT',
    headers: {
      token: accessToken.token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ count })
  });

  return await res.json();
}
