import { UserResponse } from "./login"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    //need to  use in components
    user: UserResponse
  }
  interface User {
    //will encrypt
    user: UserResponse,
    token: string
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: UserResponse,
    token: string
  }
}