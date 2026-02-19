// import { decode } from "next-auth/jwt";
// import { cookies } from "next/headers";

// export default async function DecodeToken(){


//     const x = (await cookies()).get('next-auth.session-token')?.value;
//     const accessToken = await decode({token:x , secret:process.env.NEXTAUTH_SECRET!})

//     const actualToken = accessToken?.token

//     return actualToken;
// }


import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function DecodeToken() {
    const cookieStore = await cookies();

    
    const rawToken =
        cookieStore.get('next-auth.session-token')?.value ??
        cookieStore.get('__Secure-next-auth.session-token')?.value;

    const secret = process.env.NEXTAUTH_SECRET;

   
    if (!rawToken || !secret) {
        return null;
    }

    const accessToken = await decode({
        token: rawToken,
        secret,
    });

    // Normalize to null when decode fails so callers can check safely
    return accessToken ?? null;
}

