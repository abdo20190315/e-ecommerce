'use server'

import DecodeToken from "@/app/_components/Token/Token";

export async function removeCartItemAction(productId: string) {
  const accessToken = await DecodeToken();
  if (!accessToken?.token) throw new Error("User not logged in");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v2/cart/${productId}`, {
    method: 'DELETE',
    headers: {
      token: accessToken.token,
    },
  });

  return await res.json();
}
