import { JWT } from 'next-auth/jwt';
import { FailedLoginResponse, SuccessLoginResponse } from "@/types";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler : AuthOptions = NextAuth({
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
            id: payload.user.email,
            user: payload.user,
            token: payload.token,
          }
        } else {
          // If login fails, return null;
          throw new Error(payload.message)
        }

      }
    })
  ],
  callbacks: {
    jwt: ({ token, user }) => {//will encrypt the data 

      if (user){
        token.user = user.user;
        token.token = user.token;
      }

      return token;//token {user , token}
    },
    session: ({session , token})=>{//return data will be used
      session.user = token.user;
     
      return session;
    }
  },
  pages: {
    signIn: "/login", 
    error: "/login"
  },
  secret: process.env.AUTH_SECRET

});

export { handler as GET, handler as POST }