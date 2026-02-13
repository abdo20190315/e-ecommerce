'use server'

import DecodeToken from "@/app/_components/Token/Token";

export async function clearCartAction() {
  const accessToken = await DecodeToken();
  if (!accessToken?.token) throw new Error("User not logged in");

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: 'DELETE',
    headers: {
      token: accessToken.token,
    },
  });

  return await res.json();
}
