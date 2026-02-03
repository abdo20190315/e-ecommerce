import { FailedLoginResponse, SuccessLoginResponse } from "@/types";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@email.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Replace this with your real user authentication logic
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const payload :SuccessLoginResponse|FailedLoginResponse = await res.json();

       if ('token' in payload) {
          // You can customize user object
          return {
            id:'payload.user.email',
            user:payload.user,
            token:payload.token,
          }
        }else{
              // If login fails, return null;
            throw new Error(payload.message)
        }
     
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login", // Create this page in your app if you want a custom login page
  }
});

export { handler as GET, handler as POST }